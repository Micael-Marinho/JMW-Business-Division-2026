import test from "node:test";
import assert from "node:assert/strict";
import {
  validateCheckin,
  validateProfile,
  validateDiary,
  summarize,
  periodRecords,
  previousPeriod,
} from "../../src/domain/wellbeing.js";
import { hashPassword, verifyPassword } from "../passwords.js";
const base = {
  date: "2026-10-14",
  mood: 4,
  stress: 2,
  sleep: 3,
  energy: 4,
  activity: null,
  notes: "",
};
test("check-in aceita ausência de atividade e diferencia zero", () => {
  assert.equal(validateCheckin(base, base.date).activity, null);
  assert.equal(
    validateCheckin({ ...base, activity: 0 }, base.date).activity,
    0,
  );
});
test("check-in recusa campos ausentes e números enviados como texto", () => {
  for (const value of [null, undefined, "3", 0, 6, 2.5])
    assert.throws(
      () => validateCheckin({ ...base, mood: value }, base.date),
      /Revise/,
    );
});
test("data futura e dia inexistente são recusados", () => {
  for (const date of ["2026-10-15", "2026-02-30", "2026-13-01", "xx"])
    assert.throws(() => validateCheckin({ ...base, date }, base.date));
});
test("limites de atividade e tamanho das notas são validados", () => {
  for (const activity of [-1, 1441, 2.5, "30"])
    assert.throws(() => validateCheckin({ ...base, activity }, base.date));
  assert.throws(() =>
    validateCheckin({ ...base, notes: "a".repeat(2001) }, base.date),
  );
});
test("média vazia não inventa zero e atividade nula não entra no cálculo", () => {
  assert.equal(summarize([]).sleep, null);
  assert.equal(
    summarize([
      { ...base, activity: null },
      { ...base, activity: 0 },
      { ...base, activity: 30 },
    ]).activity,
    15,
  );
});
test("intervalos atual e anterior não se sobrepõem", () => {
  const data = [
    { ...base, date: "2026-10-07" },
    { ...base, date: "2026-10-08" },
    { ...base, date: "2026-10-14" },
  ];
  assert.deepEqual(
    periodRecords(data, 7, base.date).map((r) => r.date),
    ["2026-10-08", "2026-10-14"],
  );
  assert.deepEqual(
    previousPeriod(data, 7, base.date).map((r) => r.date),
    ["2026-10-07"],
  );
});
test("nome e diário removem espaços e rejeitam conteúdo vazio", () => {
  assert.equal(validateProfile({ name: "  Micael  " }).name, "Micael");
  assert.throws(() => validateProfile({ name: "a" }));
  assert.throws(() => validateDiary({ title: " ", body: "texto" }));
  assert.deepEqual(validateDiary({ title: " Dia ", body: " Texto " }), {
    title: "Dia",
    body: "Texto",
  });
});
test("senhas têm sal individual e não são armazenadas em texto", async () => {
  const password = "uma-senha-de-teste";
  const first = await hashPassword(password),
    second = await hashPassword(password);
  assert.notEqual(first, second);
  assert.ok(!first.includes(password));
  assert.equal(await verifyPassword(password, first), true);
  assert.equal(await verifyPassword("outra-senha", first), false);
});
