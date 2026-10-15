import { useState } from "react";
import {
  Button,
  Icon,
  Face,
  ErrorNotice,
  PageHeading,
  Brand,
} from "../components/UI";
import { MOODS, todayISO, validateCheckin } from "../domain/wellbeing";
export function CheckinForm({ initial, onSave, onCancel }) {
  const [data, setData] = useState(
    initial || {
      date: todayISO(),
      mood: null,
      stress: null,
      sleep: null,
      energy: null,
      activity: "",
      notes: "",
    },
  );
  const [fields, setFields] = useState({}),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  const change = (key, value) => {
    setData((d) => ({ ...d, [key]: value }));
    setFields((f) => ({ ...f, [key]: undefined }));
  };
  async function submit(e) {
    e.preventDefault();
    setError("");
    setFields({});
    try {
      const body = validateCheckin({
        ...data,
        activity:
          data.activity === "" || data.activity === null
            ? null
            : Number(data.activity),
      });
      setBusy(true);
      await onSave(body, initial?.id);
    } catch (err) {
      setError(err.message);
      setFields(err.fields || {});
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="form-page">
      <PageHeading
        eyebrow="UM MOMENTO PARA SE PERCEBER"
        title={initial ? "Revisite seu registro." : "Como está o seu dia?"}
        text="Não existem respostas certas. Escolha o que mais se aproxima de você hoje."
      />
      <form onSubmit={submit} noValidate>
        <div className="checkin-form card">
          <div className="form-date">
            <label htmlFor="checkin-date">
              Data do registro
              <input
                id="checkin-date"
                type="date"
                min="2000-01-01"
                max={todayISO()}
                value={data.date}
                onChange={(e) => change("date", e.target.value)}
                aria-invalid={!!fields.date}
                aria-describedby={fields.date ? "date-error" : undefined}
              />
            </label>
            <span>
              <Icon name="LockKeyhole" size={16} />
              Só você acessa este registro na aplicação.
            </span>
          </div>
          {fields.date && (
            <small id="date-error" className="field-error">
              {fields.date}
            </small>
          )}
          <fieldset
            className="mood-field"
            aria-describedby={fields.mood ? "mood-error" : "mood-help"}
          >
            <legend>
              <span className="field-number">01</span>Como você se sente?
            </legend>
            <p id="mood-help">
              Escolha a opção que melhor representa seu humor.
            </p>
            <div className="mood-options">
              {MOODS.map((m) => (
                <label
                  key={m.value}
                  className={`mood-option ${data.mood === m.value ? "selected" : ""}`}
                >
                  <input
                    type="radio"
                    name="mood"
                    value={m.value}
                    checked={data.mood === m.value}
                    onChange={() => change("mood", m.value)}
                  />
                  <Face mood={m.value} size={42} />
                  <span>{m.label}</span>
                  <small>{m.value}/5</small>
                </label>
              ))}
            </div>
            {fields.mood && (
              <small id="mood-error" className="field-error">
                {fields.mood}
              </small>
            )}
          </fieldset>
          <div className="scale-grid">
            {[
              {
                key: "stress",
                n: "02",
                label: "Estresse",
                icon: "Wind",
                low: "Muito baixo",
                high: "Muito alto",
              },
              {
                key: "sleep",
                n: "03",
                label: "Qualidade do sono",
                icon: "Moon",
                low: "Muito ruim",
                high: "Muito boa",
              },
              {
                key: "energy",
                n: "04",
                label: "Energia e disposição",
                icon: "Activity",
                low: "Muito baixa",
                high: "Muito alta",
              },
            ].map((s) => (
              <fieldset
                className="scale-field"
                key={s.key}
                aria-describedby={`${s.key}-legend ${fields[s.key] ? s.key + "-error" : ""}`}
              >
                <legend>
                  <span className="field-number">{s.n}</span>
                  <Icon name={s.icon} size={18} />
                  {s.label}
                </legend>
                <div className="scale-options">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <label
                      key={v}
                      className={data[s.key] === v ? "selected" : ""}
                    >
                      <input
                        type="radio"
                        name={s.key}
                        checked={data[s.key] === v}
                        onChange={() => change(s.key, v)}
                        aria-label={`${v} de 5${v === 1 ? ": " + s.low : v === 5 ? ": " + s.high : ""}`}
                      />
                      <span>{v}</span>
                    </label>
                  ))}
                </div>
                <div id={`${s.key}-legend`} className="scale-legends">
                  <span>1 · {s.low}</span>
                  <span>5 · {s.high}</span>
                </div>
                {fields[s.key] && (
                  <small id={`${s.key}-error`} className="field-error">
                    {fields[s.key]}
                  </small>
                )}
              </fieldset>
            ))}
          </div>
          <div className="form-bottom-grid">
            <label htmlFor="activity">
              <span className="label-with-icon">
                <Icon name="Activity" size={18} />
                Atividade física <small>Opcional</small>
              </span>
              <div className="unit-input">
                <input
                  id="activity"
                  type="number"
                  min="0"
                  max="1440"
                  step="1"
                  placeholder="Ex.: 30"
                  value={data.activity ?? ""}
                  onChange={(e) => change("activity", e.target.value)}
                  aria-invalid={!!fields.activity}
                  aria-describedby="activity-help"
                />
                <span>minutos</span>
              </div>
              <small id="activity-help">
                Zero: não pratiquei. Em branco: não informado.
              </small>
              {fields.activity && (
                <small className="field-error">{fields.activity}</small>
              )}
            </label>
            <label htmlFor="notes">
              <span className="label-with-icon">
                <Icon name="BookOpen" size={18} />
                Algo que queira guardar? <small>Opcional</small>
              </span>
              <textarea
                id="notes"
                rows="3"
                maxLength="2000"
                placeholder="Uma pequena conquista, um pensamento, algo do seu dia..."
                value={data.notes}
                onChange={(e) => change("notes", e.target.value)}
              />
              <small>{data.notes.length}/2.000 caracteres</small>
            </label>
          </div>
          <ErrorNotice error={error} />
          <div className="form-actions">
            <Button type="button" variant="secondary" onClick={onCancel}>
              Voltar
            </Button>
            <Button type="submit" disabled={busy} icon="Check">
              {busy
                ? "Salvando seu registro..."
                : initial
                  ? "Salvar alterações"
                  : "Guardar meu check-in"}
            </Button>
          </div>
        </div>
        <p className="form-footnote">
          <Icon name="Leaf" size={16} />
          Este registro descreve sua percepção. Não gera avaliação clínica.
        </p>
      </form>
    </div>
  );
}
export function AuthPage({ kind, onSubmit, onBack, onSwitch, onPrivacy }) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const isRegister = kind === "cadastro";
  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      await onSubmit(
        {
          name: form.get("name"),
          email: form.get("email"),
          password: form.get("password"),
          consent: form.get("consent") === "on",
        },
        isRegister,
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="auth-page">
      <div className="auth-story">
        <button className="brand-button" onClick={onBack}>
          <Brand />
        </button>
        <div>
          <span className="eyebrow">SEU BEM-ESTAR, NO SEU TEMPO</span>
          <h1>
            Todo caminho
            <br />
            começa com
            <br />
            <em>uma pausa.</em>
          </h1>
          <p>
            Um lugar para observar sua rotina,
            <br />
            guardar suas ideias e acolher seus dias.
          </p>
          <span className="auth-leaf">
            <Icon name="Leaf" size={95} />
          </span>
        </div>
        <small>JMW Business Division 2026 · UTFPR</small>
      </div>
      <div className="auth-content">
        <button className="inline-link back-link" onClick={onBack}>
          <Icon name="ArrowLeft" size={17} />
          Voltar ao início
        </button>
        <div className="auth-box">
          <p className="eyebrow">BEM-VINDO AO SEU ESPAÇO</p>
          <h2>{isRegister ? "Vamos começar?" : "Bom ter você de volta."}</h2>
          <p>
            {isRegister
              ? "Preencha o essencial. O resto, você descobre no seu tempo."
              : "Entre para reencontrar seus registros."}
          </p>
          <form onSubmit={submit}>
            {isRegister && (
              <label htmlFor="auth-name">
                Como podemos chamar você?
                <input
                  id="auth-name"
                  name="name"
                  autoComplete="given-name"
                  placeholder="Seu nome"
                  minLength="2"
                  maxLength="80"
                  required
                />
              </label>
            )}
            <label htmlFor="auth-email">
              E-mail
              <input
                id="auth-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="voce@exemplo.com"
                required
              />
            </label>
            <label htmlFor="auth-password">
              Senha
              <input
                id="auth-password"
                name="password"
                type="password"
                autoComplete={isRegister ? "new-password" : "current-password"}
                minLength={isRegister ? 10 : 1}
                maxLength="128"
                placeholder={
                  isRegister ? "Pelo menos 10 caracteres" : "Sua senha"
                }
                required
              />
            </label>
            {isRegister && (
              <label className="checkbox-label">
                <input type="checkbox" name="consent" required />
                <span>
                  Li os{" "}
                  <button
                    type="button"
                    className="inline-link"
                    onClick={onPrivacy}
                  >
                    termos de uso e privacidade
                  </button>{" "}
                  e concordo com o armazenamento dos registros que escolher
                  informar.
                </span>
              </label>
            )}
            <ErrorNotice error={error} />
            <Button type="submit" disabled={busy}>
              {busy
                ? "Preparando seu espaço..."
                : isRegister
                  ? "Criar meu espaço"
                  : "Entrar"}
              <Icon name="ArrowRight" size={18} />
            </Button>
          </form>
          <p className="auth-switch">
            {isRegister ? "Já tem uma conta?" : "Ainda não tem uma conta?"}{" "}
            <button className="inline-link" onClick={onSwitch}>
              {isRegister ? "Entrar" : "Criar meu espaço"}
            </button>
          </p>
          <p className="auth-disclaimer">
            <Icon name="LockKeyhole" size={15} />
            Seus registros ficam vinculados à sua conta.
          </p>
        </div>
      </div>
    </main>
  );
}

export function DiaryEditor({ initial, onSave, onCancel }) {
  const [title, setTitle] = useState(initial?.title || ""),
    [body, setBody] = useState(initial?.body || ""),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await onSave({ title, body }, initial?.id);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <form onSubmit={submit} className="diary-editor">
      <label htmlFor="diary-title">
        Um título para este momento
        <input
          autoFocus
          id="diary-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="O que ficou de hoje"
          required
          maxLength="100"
        />
      </label>
      <label htmlFor="diary-body">
        Seu texto
        <textarea
          id="diary-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Este espaço é seu. Escreva sem precisar encontrar as palavras perfeitas."
          rows="10"
          required
          maxLength="10000"
        />
      </label>
      <small>
        {body.length}/10.000 caracteres · Texto privado na aplicação.
      </small>
      <ErrorNotice error={error} />
      <div className="form-actions">
        <Button variant="secondary" type="button" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={busy} icon="Check">
          {busy ? "Salvando..." : "Guardar meu texto"}
        </Button>
      </div>
    </form>
  );
}
