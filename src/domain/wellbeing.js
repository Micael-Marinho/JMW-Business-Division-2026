export const MOODS = [
  { value: 1, label: "Difícil", face: "sad", color: "#aa7891" },
  { value: 2, label: "Baixo", face: "low", color: "#bd9874" },
  { value: 3, label: "Neutro", face: "neutral", color: "#84949d" },
  { value: 4, label: "Bem", face: "happy", color: "#6b927b" },
  { value: 5, label: "Muito bem", face: "great", color: "#387567" },
];
export class ValidationError extends Error {
  constructor(message, fields = {}) {
    super(message);
    this.fields = fields;
    this.status = 422;
  }
}
export function todayISO() {
  // A data civil do Brasil evita mudar o dia antes da meia-noite local.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
  }).format(new Date());
}
export function validateCheckin(input, today = todayISO()) {
  const fields = {};
  if (
    typeof input.date !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(input.date) ||
    Number.isNaN(Date.parse(`${input.date}T12:00:00Z`)) ||
    new Date(`${input.date}T12:00:00Z`).toISOString().slice(0, 10) !==
      input.date ||
    input.date > today ||
    input.date < "2000-01-01"
  )
    fields.date = "Escolha uma data válida, até hoje.";
  for (const key of ["mood", "stress", "sleep", "energy"]) {
    if (!Number.isInteger(input[key]) || input[key] < 1 || input[key] > 5)
      fields[key] = "Escolha um nível de 1 a 5.";
  }
  // null significa não informado. Zero é uma resposta válida para atividade.
  if (
    input.activity !== null &&
    (!Number.isInteger(input.activity) ||
      input.activity < 0 ||
      input.activity > 1440)
  )
    fields.activity = "Informe de 0 a 1.440 minutos ou deixe em branco.";
  if (typeof input.notes !== "string" || input.notes.length > 2000)
    fields.notes = "Use até 2.000 caracteres.";
  if (Object.keys(fields).length)
    throw new ValidationError("Revise os campos indicados.", fields);
  return {
    date: input.date,
    mood: input.mood,
    stress: input.stress,
    sleep: input.sleep,
    energy: input.energy,
    activity: input.activity,
    notes: input.notes.trim(),
  };
}
export function validateProfile(input) {
  if (
    typeof input.name !== "string" ||
    input.name.trim().length < 2 ||
    input.name.trim().length > 80
  )
    throw new ValidationError("Informe um nome entre 2 e 80 caracteres.", {
      name: "Confira seu nome.",
    });
  return { name: input.name.trim() };
}
export function validateDiary(input) {
  const title = typeof input.title === "string" ? input.title.trim() : "";
  const body = typeof input.body === "string" ? input.body.trim() : "";
  if (!title || title.length > 100 || !body || body.length > 10000)
    throw new ValidationError(
      "Informe um título (até 100 caracteres) e um texto (até 10.000 caracteres).",
    );
  return { title, body };
}
export function periodRecords(records, days, until = todayISO()) {
  const start = new Date(`${until}T12:00:00Z`);
  start.setUTCDate(start.getUTCDate() - days + 1);
  const from = start.toISOString().slice(0, 10);
  return records
    .filter((r) => r.date >= from && r.date <= until)
    .sort((a, b) => a.date.localeCompare(b.date));
}
export function summarize(records) {
  const average = (key) => {
    const values = records
      .map((r) => r[key])
      .filter((v) => typeof v === "number" && Number.isFinite(v));
    return values.length
      ? Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) /
          10
      : null;
  };
  return {
    count: records.length,
    mood: average("mood"),
    stress: average("stress"),
    sleep: average("sleep"),
    energy: average("energy"),
    activity: average("activity"),
  };
}
export function previousPeriod(records, days, until = todayISO()) {
  const end = new Date(`${until}T12:00:00Z`);
  end.setUTCDate(end.getUTCDate() - days);
  return periodRecords(records, days, end.toISOString().slice(0, 10));
}
