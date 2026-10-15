import { useState } from "react";
import { Icon, Button, Face, PageHeading, Empty } from "../components/UI";
import Chart, { dateLabel, metricLabels } from "../components/Chart";
import {
  MOODS,
  periodRecords,
  previousPeriod,
  summarize,
  todayISO,
} from "../domain/wellbeing";
export function PeriodSelect({ days, setDays }) {
  return (
    <label className="period-select">
      <Icon name="CalendarDays" size={17} />
      <span className="sr-only">Período de visualização</span>
      <select value={days} onChange={(e) => setDays(Number(e.target.value))}>
        <option value="7">Últimos 7 dias</option>
        <option value="14">Últimos 14 dias</option>
        <option value="30">Últimos 30 dias</option>
        <option value="90">Últimos 90 dias</option>
      </select>
    </label>
  );
}
export function MetricTabs({ metric, setMetric }) {
  return (
    <div className="metric-tabs" role="group" aria-label="Indicador do gráfico">
      {Object.entries(metricLabels).map(([key, label]) => (
        <button
          key={key}
          aria-pressed={metric === key}
          className={metric === key ? "active" : ""}
          onClick={() => setMetric(key)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
export default function Overview({
  user,
  records,
  days,
  setDays,
  onCheckin,
  onHistory,
  onDiary,
  onContent,
}) {
  const [metric, setMetric] = useState("mood");
  const recent = periodRecords(records, days),
    stats = summarize(recent);
  const latest = [...records].sort((a, b) => b.date.localeCompare(a.date))[0];
  const hasToday = records.some((r) => r.date === todayISO());
  return (
    <>
      <PageHeading
        eyebrow="SEU ESPAÇO DE BEM-ESTAR"
        title={`Olá, ${user.name.split(" ")[0]}.`}
        text="Que bom ter um momento para você. Vamos olhar para os seus dias?"
      >
        <PeriodSelect days={days} setDays={setDays} />
      </PageHeading>
      <section className="checkin-banner">
        <div>
          <span className="pill">
            <span className="status-dot" />
            {hasToday ? "SEU DIA JÁ TEM UM REGISTRO" : "UMA PAUSA NA ROTINA"}
          </span>
          <h2>
            {hasToday
              ? "Seu momento de hoje está guardado."
              : "Como você está se sentindo hoje?"}
          </h2>
          <p>
            {hasToday
              ? "Você pode voltar ao registro e ajustar o que fizer sentido."
              : "Não precisa encontrar as palavras perfeitas. Comece com um check-in."}
          </p>
          <Button
            onClick={() =>
              onCheckin(
                hasToday ? records.find((r) => r.date === todayISO()) : null,
              )
            }
            icon={hasToday ? "Pencil" : "Plus"}
          >
            {hasToday ? "Revisitar meu dia" : "Fazer meu check-in"}
          </Button>
        </div>
        <div className="banner-art" aria-hidden="true">
          <span />
          <Icon name="Leaf" size={87} />
          <i />
        </div>
      </section>
      <div className="stats-grid">
        {[
          {
            key: "count",
            label: "Momentos registrados",
            icon: "CalendarDays",
            tone: "sage",
            value: stats.count,
            unit: "check-ins",
            help: `nos últimos ${days} dias`,
          },
          {
            key: "sleep",
            label: "Qualidade do sono",
            icon: "Moon",
            tone: "lavender",
            value: stats.sleep,
            unit: "/ 5",
            help: "média dos registros",
          },
          {
            key: "stress",
            label: "Estresse percebido",
            icon: "Wind",
            tone: "sand",
            value: stats.stress,
            unit: "/ 5",
            help: "1: muito baixo · 5: muito alto",
          },
          {
            key: "energy",
            label: "Energia e disposição",
            icon: "Activity",
            tone: "blue",
            value: stats.energy,
            unit: "/ 5",
            help: "média dos registros",
          },
        ].map((s) => (
          <article className="stat-card card" key={s.key}>
            <div>
              <span>{s.label}</span>
              <span className={`stat-icon ${s.tone}`}>
                <Icon name={s.icon} size={19} />
              </span>
            </div>
            <p>
              <strong>
                {s.value === null ? "—" : String(s.value).replace(".", ",")}
              </strong>
              <span>{s.value !== null && s.unit}</span>
            </p>
            <small>
              {s.value === null ? "Aguardando seu primeiro registro" : s.help}
            </small>
          </article>
        ))}
      </div>
      <div className="dashboard-grid">
        <section className="chart-card card">
          <div className="card-heading">
            <div>
              <p className="eyebrow">UM OLHAR SOBRE O TEMPO</p>
              <h2>Seus dias, em perspectiva</h2>
            </div>
            <span className="soft-tag">{recent.length} registros</span>
          </div>
          <MetricTabs metric={metric} setMetric={setMetric} />
          <Chart records={recent} metric={metric} />
          <p className="chart-note">
            Escala autorreferida de 1 a 5. Os pontos conectam registros
            disponíveis, sem preencher dias ausentes.
          </p>
        </section>
        <div className="dashboard-aside">
          <section className="last-mood card">
            <p className="eyebrow">SEU ÚLTIMO REGISTRO</p>
            {latest ? (
              <>
                <span className="large-face">
                  <Face mood={latest.mood} size={63} />
                </span>
                <h2>{MOODS.find((m) => m.value === latest.mood)?.label}</h2>
                <p>{dateLabel(latest.date, true)}</p>
                <button
                  className="inline-link"
                  onClick={() => onCheckin(latest)}
                >
                  Revisitar este momento
                  <Icon name="ArrowRight" size={16} />
                </button>
              </>
            ) : (
              <Empty
                title="Como você está?"
                text="Seu último humor registrado aparecerá aqui."
                icon="Heart"
              />
            )}
          </section>
          <section className="reflection-card">
            <span>
              <Icon name="BookOpen" size={21} />
            </span>
            <h3>
              O que você quer
              <br />
              guardar de hoje?
            </h3>
            <p>Às vezes, escrever ajuda a organizar o que ficou do dia.</p>
            <button className="inline-link" onClick={onDiary}>
              Abrir meu diário
              <Icon name="ArrowRight" size={16} />
            </button>
          </section>
        </div>
      </div>
      <section className="recent-card card">
        <div className="card-heading">
          <div>
            <p className="eyebrow">PEQUENAS PARTES DA SUA HISTÓRIA</p>
            <h2>Seus últimos momentos</h2>
          </div>
          <button className="inline-link" onClick={onHistory}>
            Ver histórico
            <Icon name="ArrowRight" size={16} />
          </button>
        </div>
        {records.length ? (
          <div className="recent-list">
            {[...records]
              .sort((a, b) => b.date.localeCompare(a.date))
              .slice(0, 3)
              .map((r) => (
                <button key={r.id} onClick={() => onCheckin(r)}>
                  <span className="mini-face">
                    <Face mood={r.mood} size={31} />
                  </span>
                  <span>
                    <strong>
                      {MOODS.find((m) => m.value === r.mood)?.label}
                    </strong>
                    <small>{dateLabel(r.date, true)}</small>
                  </span>
                  <p>{r.notes || "Um momento registrado para você."}</p>
                  <Icon name="ChevronRight" size={18} />
                </button>
              ))}
          </div>
        ) : (
          <Empty
            title="A sua história começa no primeiro registro"
            text="Você não precisa preencher o passado para começar hoje."
            action={
              <Button variant="secondary" onClick={() => onCheckin(null)}>
                Registrar meu dia
              </Button>
            }
          />
        )}
      </section>
      <div className="gentle-reminder">
        <Icon name="Coffee" size={22} />
        <p>
          Você não precisa transformar cada dia em uma conquista.
          <br />
          <strong>Perceber como está já é um começo.</strong>
        </p>
        <button className="inline-link" onClick={onContent}>
          Uma pausa para refletir
          <Icon name="ArrowRight" size={17} />
        </button>
      </div>
    </>
  );
}
export function History({ records, days, setDays, onEdit, onDelete }) {
  const [metric, setMetric] = useState("mood"),
    [from, setFrom] = useState(""),
    [to, setTo] = useState("");
  const dateError = from && to && from > to;
  const rows =
    from || to
      ? records
          .filter((r) => (!from || r.date >= from) && (!to || r.date <= to))
          .sort((a, b) => a.date.localeCompare(b.date))
      : periodRecords(records, days);
  const current = summarize(rows),
    prior = summarize(previousPeriod(records, days));
  return (
    <>
      <PageHeading
        eyebrow="SEU CAMINHO, SEM JULGAMENTOS"
        title="Cada dia tem sua história."
        text="Observe seus registros, compare períodos e revisite o que ficou."
      >
        <PeriodSelect
          days={days}
          setDays={(v) => {
            setDays(v);
            setFrom("");
            setTo("");
          }}
        />
      </PageHeading>
      <section className="card chart-card">
        <div className="card-heading">
          <h2>Evolução dos registros</h2>
          <span className="soft-tag">{rows.length} momentos</span>
        </div>
        <div className="history-filters">
          <label>
            De
            <input
              type="date"
              value={from}
              max={todayISO()}
              onChange={(e) => setFrom(e.target.value)}
            />
          </label>
          <label>
            Até
            <input
              type="date"
              value={to}
              max={todayISO()}
              onChange={(e) => setTo(e.target.value)}
            />
          </label>
          {(from || to) && (
            <button
              className="inline-link"
              onClick={() => {
                setFrom("");
                setTo("");
              }}
            >
              Limpar filtro
            </button>
          )}
        </div>
        {dateError ? (
          <p role="alert" className="field-error">
            A data inicial deve ser anterior à final.
          </p>
        ) : (
          <>
            <MetricTabs metric={metric} setMetric={setMetric} />
            <Chart records={rows} metric={metric} />
          </>
        )}
      </section>
      {!from && !to && (
        <section className="comparison card">
          <h3>Um período ao lado do outro</h3>
          <p>
            Últimos {days} dias comparados aos {days} dias anteriores. Médias
            descritivas, sem interpretação clínica.
          </p>
          <div className="comparison-grid">
            {["sleep", "stress", "energy"].map((k) => (
              <div key={k}>
                <span>{metricLabels[k]}</span>
                <strong>
                  {current[k] ?? "—"}
                  <small>/5</small>
                  <Icon name="ArrowLeft" size={14} />
                  <span>
                    {prior[k] ?? "—"}
                    <small>/5</small>
                  </span>
                </strong>
                <small>atual ← anterior</small>
              </div>
            ))}
          </div>
        </section>
      )}
      <section className="card history-card">
        <div className="card-heading">
          <h2>Todos os momentos do período</h2>
          <Icon name="CalendarDays" />
        </div>
        {!rows.length || dateError ? (
          <Empty
            title="Nenhum registro neste período"
            text="Experimente outro intervalo ou comece com um novo check-in."
          />
        ) : (
          <div className="table-wrap">
            <table>
              <caption className="sr-only">
                Check-ins pessoais filtrados pelo período
              </caption>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Humor</th>
                  <th>Sono</th>
                  <th>Estresse</th>
                  <th>Energia</th>
                  <th>Atividade</th>
                  <th>
                    <span className="sr-only">Ações</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...rows].reverse().map((r) => (
                  <tr key={r.id}>
                    <td>{dateLabel(r.date)}</td>
                    <td>
                      <span className="table-mood">
                        <Face mood={r.mood} size={25} />
                        {MOODS.find((m) => m.value === r.mood)?.label}
                      </span>
                    </td>
                    <td>{r.sleep}/5</td>
                    <td>{r.stress}/5</td>
                    <td>{r.energy}/5</td>
                    <td>
                      {r.activity === null
                        ? "Não informado"
                        : `${r.activity} min`}
                    </td>
                    <td>
                      <div className="table-actions">
                        <button
                          className="icon-button"
                          onClick={() => onEdit(r)}
                          aria-label={`Editar check-in de ${dateLabel(r.date)}`}
                        >
                          <Icon name="Pencil" size={16} />
                        </button>
                        <button
                          className="icon-button"
                          onClick={() => onDelete(r)}
                          aria-label={`Excluir check-in de ${dateLabel(r.date)}`}
                        >
                          <Icon name="Trash2" size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
