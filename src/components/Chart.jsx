import { useId, useState } from "react";
import { Empty } from "./UI";
export const metricLabels = {
  mood: "Humor",
  stress: "Estresse",
  sleep: "Sono",
  energy: "Energia",
};
export function dateLabel(date, full = false) {
  return new Date(`${date}T12:00:00`).toLocaleDateString(
    "pt-BR",
    full
      ? { day: "2-digit", month: "long", year: "numeric" }
      : { day: "2-digit", month: "2-digit" },
  );
}
export default function Chart({ records, metric = "mood", compact = false }) {
  const id = useId().replace(/:/g, "");
  const [focus, setFocus] = useState(null);
  if (!records.length)
    return (
      <Empty
        title="Cada registro conta uma parte da sua história"
        text="Seu gráfico aparece depois do primeiro check-in. Você pode começar no seu tempo."
      />
    );
  const sorted = [...records].sort((a, b) => a.date.localeCompare(b.date));
  // As posições usam as datas reais. Dias sem check-in não viram respostas zero.
  const first = Date.parse(sorted[0].date),
    last = Date.parse(sorted.at(-1).date);
  const x = (r) =>
    first === last
      ? 300
      : 40 + ((Date.parse(r.date) - first) / (last - first)) * 520;
  const y = (r) => 178 - (r[metric] - 1) * 36;
  const line = sorted
    .map((r, i) => `${i ? "L" : "M"}${x(r)},${y(r)}`)
    .join(" ");
  const area = `${line} L${x(sorted.at(-1))},188 L${x(sorted[0])},188 Z`;
  const selected = sorted.find((r) => r.id === focus);
  return (
    <div className={`chart ${compact ? "compact-chart" : ""}`}>
      <div className="chart-caption" aria-live="polite">
        {selected
          ? `${dateLabel(selected.date)} · ${metricLabels[metric]} ${selected[metric]}/5`
          : "Passe sobre os pontos para explorar seus registros"}
      </div>
      <svg
        viewBox="0 0 600 225"
        role="img"
        aria-label={`Evolução de ${metricLabels[metric]}, escala de 1 a 5. Os valores estão na tabela abaixo.`}
      >
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity=".23" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[1, 2, 3, 4, 5].map((v) => (
          <g key={v}>
            <line
              x1="40"
              x2="570"
              y1={178 - (v - 1) * 36}
              y2={178 - (v - 1) * 36}
              stroke="var(--line)"
              strokeDasharray="3 6"
            />
            <text
              x="17"
              y={182 - (v - 1) * 36}
              fill="var(--muted)"
              fontSize="11"
            >
              {v}
            </text>
          </g>
        ))}
        <path d={area} fill={`url(#${id})`} />
        <path
          d={line}
          stroke="var(--accent)"
          strokeWidth="2.7"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {sorted.map((r) => (
          <g
            key={r.id}
            onMouseEnter={() => setFocus(r.id)}
            onMouseLeave={() => setFocus(null)}
          >
            <circle cx={x(r)} cy={y(r)} r="12" fill="transparent" />
            <circle
              cx={x(r)}
              cy={y(r)}
              r={focus === r.id ? 6 : 4}
              fill="var(--surface)"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <title>
              {dateLabel(r.date)}: {r[metric]}/5
            </title>
          </g>
        ))}
        <text x="40" y="213" fill="var(--muted)" fontSize="11">
          {dateLabel(sorted[0].date)}
        </text>
        {sorted.length > 1 && (
          <text
            x="560"
            y="213"
            textAnchor="end"
            fill="var(--muted)"
            fontSize="11"
          >
            {dateLabel(sorted.at(-1).date)}
          </text>
        )}
      </svg>
      {!compact && (
        <details className="chart-table">
          <summary>Consultar os valores do gráfico</summary>
          <div className="table-wrap">
            <table>
              <caption>
                Registros de {metricLabels[metric]} · escala 1 a 5
              </caption>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>{metricLabels[metric]}</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((r) => (
                  <tr key={r.id}>
                    <td>{dateLabel(r.date)}</td>
                    <td>{r[metric]}/5</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      )}
    </div>
  );
}
