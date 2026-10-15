import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";
import { randomBytes, randomUUID } from "node:crypto";
import { Op } from "sequelize";
import { hashPassword, verifyPassword, tokenDigest } from "./passwords.js";
import {
  validateCheckin,
  validateDiary,
  validateProfile,
  ValidationError,
} from "../src/domain/wellbeing.js";
const safeUser = (user) => ({
  id: user.id,
  name: user.name,
  consentVersion: user.consentVersion,
  createdAt: user.createdAt,
});
const safeCheckin = (r) => {
  const { id, date, mood, stress, sleep, energy, activity, notes } = r;
  return { id, date, mood, stress, sleep, energy, activity, notes };
};
const safeDiary = (r) => ({
  id: r.id,
  title: r.title,
  body: r.body,
  createdAt: r.createdAt,
});
export function createApp(
  db,
  {
    origin = process.env.APP_ORIGIN || "http://localhost:5173",
    production = process.env.NODE_ENV === "production",
  } = {},
) {
  const { sequelize, User, Session, Checkin, Diary } = db;
  const app = express();
  app.disable("x-powered-by");
  app.use(helmet());
  app.use(express.json({ limit: "32kb" }));
  app.use(cookieParser());
  const cookieName = production ? "__Host-mindtrack" : "mindtrack_session";
  const cookieOptions = {
    httpOnly: true,
    secure: production,
    sameSite: "lax",
    path: "/",
  };
  app.use("/api", (req, res, next) => {
    res.set("Cache-Control", "no-store");
    if (!["GET", "HEAD"].includes(req.method) && req.get("origin") !== origin)
      return res.status(403).json({ error: "Origem da solicitação inválida." });
    if (
      !["GET", "HEAD"].includes(req.method) &&
      (typeof req.body !== "object" ||
        req.body === null ||
        Array.isArray(req.body))
    )
      return res.status(400).json({ error: "Solicitação inválida." });
    next();
  });
  const authLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
      error:
        "Muitas tentativas. Aguarde alguns minutos antes de tentar novamente.",
    },
  });
  const writeLimit = rateLimit({
    windowMs: 60 * 1000,
    limit: 60,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { error: "Muitas solicitações. Aguarde um minuto." },
  });
  app.use("/api/auth", authLimit);
  async function newSession(user, res) {
    const token = randomBytes(32).toString("hex");
    await Session.destroy({ where: { expiresAt: { [Op.lt]: new Date() } } });
    await Session.create({
      tokenHash: tokenDigest(token),
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 86400000),
    });
    res.cookie(cookieName, token, { ...cookieOptions, maxAge: 7 * 86400000 });
  }
  app.post("/api/auth/register", async (req, res) => {
    const { name } = validateProfile(req.body);
    const email =
      typeof req.body.email === "string"
        ? req.body.email.trim().toLowerCase()
        : "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254)
      throw new ValidationError("Informe um e-mail válido.");
    if (
      typeof req.body.password !== "string" ||
      req.body.password.length < 10 ||
      req.body.password.length > 128
    )
      throw new ValidationError("Use uma senha entre 10 e 128 caracteres.");
    if (req.body.consent !== true)
      throw new ValidationError(
        "Leia e aceite os termos de uso e privacidade.",
      );
    if (await User.findOne({ where: { email } }))
      return res
        .status(409)
        .json({
          error:
            "Não foi possível cadastrar esse e-mail. Tente entrar na sua conta.",
        });
    const user = await User.create({
      id: randomUUID(),
      name,
      email,
      passwordHash: await hashPassword(req.body.password),
      consentVersion: "2026-10-v1",
      createdAt: new Date(),
    });
    await newSession(user, res);
    res.status(201).json({ user: safeUser(user) });
  });
  app.post("/api/auth/login", async (req, res) => {
    const email =
      typeof req.body.email === "string"
        ? req.body.email.trim().toLowerCase()
        : "";
    const password =
      typeof req.body.password === "string" ? req.body.password : "";
    if (!password || password.length > 128)
      return res.status(401).json({ error: "E-mail ou senha incorretos." });
    const user = await User.findOne({ where: { email } });
    // A derivação também acontece para e-mails desconhecidos, reduzindo diferenças de tempo.
    const stored =
      user?.passwordHash ||
      `scrypt$00000000000000000000000000000000$${"00".repeat(64)}`;
    const valid = await verifyPassword(password, stored);
    if (!user || !valid)
      return res.status(401).json({ error: "E-mail ou senha incorretos." });
    await newSession(user, res);
    res.json({ user: safeUser(user) });
  });
  app.use("/api", async (req, res, next) => {
    const token = req.cookies[cookieName];
    if (typeof token !== "string" || !/^[0-9a-f]{64}$/.test(token))
      return res
        .status(401)
        .json({ error: "Entre na sua conta para continuar." });
    const session = await Session.findOne({
      where: {
        tokenHash: tokenDigest(token),
        expiresAt: { [Op.gt]: new Date() },
      },
    });
    const user = session && (await User.findByPk(session.userId));
    if (!user)
      return res
        .status(401)
        .json({ error: "Sua sessão expirou. Entre novamente." });
    req.user = user;
    req.sessionHash = session.tokenHash;
    next();
  });
  app.use("/api", (req, res, next) =>
    req.method === "GET" ? next() : writeLimit(req, res, next),
  );
  app.get("/api/session", (req, res) =>
    res.json({ mode: "local", user: safeUser(req.user) }),
  );
  app.post("/api/auth/logout", async (req, res) => {
    await Session.destroy({ where: { tokenHash: req.sessionHash } });
    res.clearCookie(cookieName, cookieOptions);
    res.json({ ok: true });
  });
  app.patch("/api/profile", async (req, res) => {
    const data = validateProfile(req.body);
    await req.user.update(data);
    res.json({ user: safeUser(req.user) });
  });
  app.delete("/api/profile", async (req, res) => {
    if (req.body.confirm !== "EXCLUIR")
      throw new ValidationError("Digite EXCLUIR para confirmar.");
    await sequelize.transaction(async (transaction) => {
      await req.user.destroy({ transaction });
    });
    res.clearCookie(cookieName, cookieOptions);
    res.json({ ok: true });
  });
  // O userId sempre vem da sessão. Receber esse campo do formulário permitiria acessar outra conta.
  app.get("/api/checkins", async (req, res) => {
    const records = await Checkin.findAll({
      where: { userId: req.user.id },
      order: [["date", "DESC"]],
    });
    res.json({ records: records.map(safeCheckin) });
  });
  app.post("/api/checkins", async (req, res) => {
    const data = validateCheckin(req.body);
    if (
      await Checkin.findOne({ where: { userId: req.user.id, date: data.date } })
    )
      return res
        .status(409)
        .json({
          error:
            "Já existe um check-in nessa data. Edite o registro no histórico.",
          fields: { date: "Essa data já possui um registro." },
        });
    const record = await Checkin.create({
      id: randomUUID(),
      userId: req.user.id,
      ...data,
    });
    res.status(201).json({ record: safeCheckin(record) });
  });
  app.patch("/api/checkins/:id", async (req, res) => {
    const record = await Checkin.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!record)
      return res.status(404).json({ error: "Registro não encontrado." });
    const data = validateCheckin(req.body);
    if (
      await Checkin.findOne({
        where: {
          userId: req.user.id,
          date: data.date,
          id: { [Op.ne]: record.id },
        },
      })
    )
      return res
        .status(409)
        .json({ error: "Já existe um check-in nessa data." });
    await record.update(data);
    res.json({ record: safeCheckin(record) });
  });
  app.delete("/api/checkins/:id", async (req, res) => {
    const count = await Checkin.destroy({
      where: { id: req.params.id, userId: req.user.id },
    });
    res
      .status(count ? 200 : 404)
      .json(count ? { ok: true } : { error: "Registro não encontrado." });
  });
  app.get("/api/diaries", async (req, res) => {
    const records = await Diary.findAll({
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]],
    });
    res.json({ records: records.map(safeDiary) });
  });
  app.post("/api/diaries", async (req, res) => {
    const data = validateDiary(req.body);
    const record = await Diary.create({
      id: randomUUID(),
      userId: req.user.id,
      createdAt: new Date(),
      ...data,
    });
    res.status(201).json({ record: safeDiary(record) });
  });
  app.patch("/api/diaries/:id", async (req, res) => {
    const record = await Diary.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!record)
      return res.status(404).json({ error: "Texto não encontrado." });
    await record.update(validateDiary(req.body));
    res.json({ ok: true });
  });
  app.delete("/api/diaries/:id", async (req, res) => {
    const count = await Diary.destroy({
      where: { id: req.params.id, userId: req.user.id },
    });
    res
      .status(count ? 200 : 404)
      .json(count ? { ok: true } : { error: "Texto não encontrado." });
  });
  app.get("/api/export", async (req, res) => {
    const [checkins, diaries] = await Promise.all([
      Checkin.findAll({
        where: { userId: req.user.id },
        order: [["date", "ASC"]],
      }),
      Diary.findAll({
        where: { userId: req.user.id },
        order: [["createdAt", "ASC"]],
      }),
    ]);
    res.json({
      exportedAt: new Date().toISOString(),
      profile: safeUser(req.user),
      checkins: checkins.map(safeCheckin),
      diaries: diaries.map(safeDiary),
    });
  });
  app.use("/api", (req, res) =>
    res.status(404).json({ error: "Caminho não encontrado." }),
  );
  app.use((err, req, res, next) => {
    if (err.status)
      return res
        .status(err.status)
        .json({
          error: err.status === 413 ? "Texto muito grande." : err.message,
          fields: err.fields,
        });
    if (err.name === "SequelizeUniqueConstraintError")
      return res
        .status(409)
        .json({
          error:
            "Esse registro já existe. Atualize a página e tente novamente.",
        });
    if (err.name === "SequelizeDatabaseError" && err.parent?.code === "22P02")
      return res.status(404).json({ error: "Registro não encontrado." });
    console.error("MindTrack API error:", err.name);
    res
      .status(500)
      .json({ error: "Não foi possível concluir agora. Tente novamente." });
  });
  return app;
}
