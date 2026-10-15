import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import request from "supertest";
import { newDb, DataType } from "pg-mem";
import { defineDatabase } from "../database.js";
import { createApp } from "../app.js";
import { todayISO } from "../../src/domain/wellbeing.js";
const origin = "http://localhost:5173";
async function fixture() {
  // O emulador testa a integração SQL sem exigir uma instância externa.
  // A homologação em PostgreSQL real continua sendo uma etapa separada.
  const memory = newDb();
  memory.public.registerFunction({
    name: "char_length",
    args: [DataType.text],
    returns: DataType.integer,
    implementation: (value) => value.length,
  });
  memory.public.none(
    readFileSync(
      new URL("../migrations/001_initial.sql", import.meta.url),
      "utf8",
    ),
  );
  const db = defineDatabase(
    "postgres://tester:test@localhost/mindtrack_tests",
    memory.adapters.createPg(),
  );
  await db.sequelize.authenticate();
  return { app: createApp(db, { origin, production: false }), db };
}
const credentials = (name = "Ana") => ({
  name,
  email: `${name.toLowerCase()}@example.test`,
  password: "senha-de-teste-123",
  consent: true,
});
const payload = () => ({
  date: todayISO(),
  mood: 4,
  sleep: 4,
  stress: 2,
  energy: 3,
  activity: null,
  notes: "registro privado",
});
test("Express: cadastro, sessão persistida, login inválido, logout e bloqueio posterior", async () => {
  const { app, db } = await fixture();
  const agent = request.agent(app);
  const register = await agent
    .post("/api/auth/register")
    .set("Origin", origin)
    .send(credentials());
  assert.equal(register.status, 201);
  assert.ok(register.headers["set-cookie"][0].includes("HttpOnly"));
  assert.ok(register.headers["set-cookie"][0].includes("SameSite=Lax"));
  const stored = await db.User.findOne();
  assert.notEqual(stored.passwordHash, credentials().password);
  assert.equal((await agent.get("/api/session")).body.user.name, "Ana");
  assert.equal(
    (await agent.post("/api/auth/logout").set("Origin", origin).send({}))
      .status,
    200,
  );
  assert.equal((await agent.get("/api/checkins")).status, 401);
  assert.equal(
    (
      await agent
        .post("/api/auth/login")
        .set("Origin", origin)
        .send({ ...credentials(), password: "incorreta" })
    ).status,
    401,
  );
  assert.equal(
    (
      await agent
        .post("/api/auth/login")
        .set("Origin", origin)
        .send(credentials())
    ).status,
    200,
  );
  assert.equal((await agent.get("/api/session")).status, 200);
  await db.sequelize.close();
});
test("Express: CRUD de check-in e diário, conflito de data, exportação e exclusão da conta", async () => {
  const { app, db } = await fixture();
  const agent = request.agent(app);
  await agent
    .post("/api/auth/register")
    .set("Origin", origin)
    .send(credentials());
  const first = await agent
    .post("/api/checkins")
    .set("Origin", origin)
    .send(payload());
  assert.equal(first.status, 201);
  assert.equal(
    (await agent.post("/api/checkins").set("Origin", origin).send(payload()))
      .status,
    409,
  );
  const edit = await agent
    .patch(`/api/checkins/${first.body.record.id}`)
    .set("Origin", origin)
    .send({ ...payload(), activity: 0, mood: 5 });
  assert.equal(edit.body.record.mood, 5);
  const diary = await agent
    .post("/api/diaries")
    .set("Origin", origin)
    .send({ title: "Meu dia", body: "Meu texto" });
  assert.equal(diary.status, 201);
  assert.equal(
    (
      await agent
        .patch(`/api/diaries/${diary.body.record.id}`)
        .set("Origin", origin)
        .send({ title: "Revisto", body: "Meu texto revisto" })
    ).status,
    200,
  );
  const exported = await agent.get("/api/export");
  assert.equal(exported.body.checkins[0].activity, 0);
  assert.equal(exported.body.diaries[0].title, "Revisto");
  assert.equal(exported.body.profile.passwordHash, undefined);
  assert.equal(
    (
      await agent
        .delete("/api/profile")
        .set("Origin", origin)
        .send({ confirm: "EXCLUIR" })
    ).status,
    200,
  );
  assert.equal(await db.Checkin.count(), 0);
  assert.equal(await db.Diary.count(), 0);
  assert.equal(await db.Session.count(), 0);
  assert.equal((await agent.get("/api/checkins")).status, 401);
  await db.sequelize.close();
});
test("Express: duas contas isoladas e userId recebido no formulário é ignorado", async () => {
  const { app, db } = await fixture();
  const ana = request.agent(app),
    bia = request.agent(app);
  await ana
    .post("/api/auth/register")
    .set("Origin", origin)
    .send(credentials("Ana"));
  const registered = await bia
    .post("/api/auth/register")
    .set("Origin", origin)
    .send(credentials("Bia"));
  const first = await ana
    .post("/api/checkins")
    .set("Origin", origin)
    .send({ ...payload(), userId: registered.body.user.id });
  assert.equal((await bia.get("/api/checkins")).body.records.length, 0);
  assert.equal(
    (
      await bia
        .patch(`/api/checkins/${first.body.record.id}`)
        .set("Origin", origin)
        .send(payload())
    ).status,
    404,
  );
  assert.equal(
    (
      await bia
        .delete(`/api/checkins/${first.body.record.id}`)
        .set("Origin", origin)
        .send({})
    ).status,
    404,
  );
  assert.equal((await ana.get("/api/checkins")).body.records.length, 1);
  await db.sequelize.close();
});
test("Express: origem externa, corpo inválido, escala incompleta e data futura são recusados", async () => {
  const { app, db } = await fixture();
  const agent = request.agent(app);
  assert.equal(
    (
      await agent
        .post("/api/auth/register")
        .set("Origin", "https://outro.test")
        .send(credentials())
    ).status,
    403,
  );
  assert.equal(
    (
      await agent
        .post("/api/auth/register")
        .set("Origin", origin)
        .send({ ...credentials(), password: "123" })
    ).status,
    422,
  );
  await agent
    .post("/api/auth/register")
    .set("Origin", origin)
    .send(credentials());
  assert.equal(
    (
      await agent
        .post("/api/checkins")
        .set("Origin", origin)
        .send({ ...payload(), mood: null })
    ).status,
    422,
  );
  assert.equal(
    (
      await agent
        .post("/api/checkins")
        .set("Origin", origin)
        .send({ ...payload(), date: "2099-01-01" })
    ).status,
    422,
  );
  assert.equal(
    (
      await agent
        .post("/api/checkins")
        .set("Origin", origin)
        .set("Content-Type", "application/json")
        .send("null")
    ).status,
    400,
  );
  await db.sequelize.close();
});
