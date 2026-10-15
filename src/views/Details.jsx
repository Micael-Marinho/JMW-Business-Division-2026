import { useState } from "react";
import {
  Button,
  Icon,
  PageHeading,
  ErrorNotice,
  Brand,
} from "../components/UI";
export function About({ standalone, onBack }) {
  return (
    <div className={standalone ? "standalone-about" : ""}>
      {standalone && (
        <div className="about-top">
          <Brand />
          <Button variant="secondary" onClick={onBack} icon="ArrowLeft">
            Voltar
          </Button>
        </div>
      )}
      <PageHeading
        eyebrow="JMW BUSINESS DIVISION 2026"
        title="Tecnologia com um olhar humano."
        text="MindTrack — acompanhamento e prevenção em saúde mental."
      />
      <div className="about-grid">
        <article className="card prose">
          <p className="eyebrow">O PROJETO</p>
          <h2>Por que desenvolvemos o MindTrack?</h2>
          <p>
            A rotina nem sempre deixa espaço para perceber como estamos.
            Partimos dessa questão para propor uma ferramenta simples: registrar
            o dia, revisitar os hábitos e guardar reflexões pessoais.
          </p>
          <p>
            Este projeto acadêmico relaciona desenvolvimento de software,
            experiência do usuário e cuidado com a privacidade. Os indicadores
            descrevem o que a pessoa informou; não classificam transtornos, não
            estabelecem causas e não recomendam tratamentos.
          </p>
          <dl>
            <dt>Disciplina</dt>
            <dd>AS63C — Desenvolvimento Ágil</dd>
            <dt>Professora</dt>
            <dd>Érica Souza</dd>
            <dt>Instituição</dt>
            <dd>UTFPR — Campus Cornélio Procópio</dd>
            <dt>Período</dt>
            <dd>Segundo semestre de 2026</dd>
          </dl>
          <h3>Nosso grupo</h3>
          <ul className="member-list">
            <li>
              <strong>João Victor Queiroz de Lima</strong>
              <span>RA 2051524</span>
            </li>
            <li>
              <strong>Micael Marinho Souza</strong>
              <span>
                RA 2819457 ·{" "}
                <a
                  href="https://github.com/Micael-Marinho"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </span>
            </li>
            <li>
              <strong>Wagner Lourenço de Oliveira Junior</strong>
              <span>RA 2819473</span>
            </li>
          </ul>
          <p className="subtle">
            A identidade do MindTrack foi criada para esta interface. A logo
            original do grupo não foi fornecida nesta entrega.
          </p>
        </article>
        <article className="card prose" id="politica-privacidade">
          <p className="eyebrow">USO E PRIVACIDADE · VERSÃO 2026-10-V1</p>
          <h2>Você participa no seu tempo.</h2>
          <p>
            Ao criar seu perfil, você concorda com o armazenamento dos registros
            que escolher informar, para consultar sua rotina nesta aplicação
            acadêmica.
          </p>
          <h3>O que é registrado</h3>
          <p>
            Nome, dados de autenticação, data dos check-ins, humor, estresse,
            qualidade do sono e energia. Atividade física, observações e textos
            do diário são opcionais.
          </p>
          <h3>Como os dados são usados</h3>
          <p>
            Para mostrar seu histórico, calcular médias descritivas e manter o
            acesso à sua conta. Não há publicidade, compartilhamento público ou
            integração com inteligência artificial.
          </p>
          <h3>Seu controle</h3>
          <p>
            Você pode editar ou excluir registros, exportar uma cópia em JSON e
            excluir seu perfil com os dados associados nas configurações. Os
            dados permanecem no banco ativo até você excluí-los.
          </p>
          <h3>Limites da proteção</h3>
          <p>
            A aplicação verifica o titular em cada consulta. A infraestrutura é
            operada por provedores de hospedagem; os responsáveis técnicos devem
            restringir acessos ao banco. A exclusão remove os dados ativos, mas
            a retenção de eventuais cópias de segurança depende do provedor.
          </p>
          <h3>Antes de uso público</h3>
          <p>
            O grupo ainda precisa definir o responsável pelo tratamento, um
            canal de contato, a política de backup e retenção do provedor e a
            avaliação jurídica aplicável. Esta versão é voltada à demonstração
            acadêmica, preferencialmente com dados de teste.
          </p>
          <div className="info-note">
            <Icon name="CircleHelp" size={21} />
            <p>
              O MindTrack não oferece diagnóstico, psicoterapia ou atendimento
              emergencial.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
export function SettingsPage({
  user,
  theme,
  setTheme,
  reduced,
  setReduced,
  contrast,
  setContrast,
  onUpdate,
  onExport,
  onDelete,
  demo,
}) {
  const [name, setName] = useState(user.name),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  async function save(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await onUpdate(name);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <PageHeading
        eyebrow="DO SEU JEITO"
        title="Um espaço com a sua cara."
        text="Ajuste sua experiência e mantenha o controle dos seus registros."
      />
      <div className="settings-grid">
        <section className="card settings-card">
          <span className="section-icon">
            <Icon name="Heart" />
          </span>
          <h2>Seu perfil</h2>
          <p>Como você prefere ser chamado?</p>
          <form onSubmit={save}>
            <label htmlFor="profile-name">
              Seu nome
              <input
                id="profile-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                minLength="2"
                maxLength="80"
                required
              />
            </label>
            <ErrorNotice error={error} />
            <Button type="submit" disabled={busy || demo}>
              {busy ? "Salvando..." : "Salvar nome"}
            </Button>
          </form>
        </section>
        <section className="card settings-card">
          <span className="section-icon lavender">
            <Icon name="Sun" />
          </span>
          <h2>Aparência e acessibilidade</h2>
          <p>Escolha o que deixa a leitura mais confortável.</p>
          <fieldset className="theme-options">
            <legend>Tema</legend>
            {[
              ["light", "Claro", "Sun"],
              ["dark", "Escuro", "Moon"],
              ["system", "Automático", "Settings"],
            ].map(([key, label, icon]) => (
              <label className={theme === key ? "selected" : ""} key={key}>
                <input
                  type="radio"
                  name="theme"
                  checked={theme === key}
                  onChange={() => setTheme(key)}
                />
                <Icon name={icon} size={20} />
                <span>{label}</span>
              </label>
            ))}
          </fieldset>
          <label className="toggle-row">
            <span>
              Reduzir animações
              <small>A preferência do sistema também é respeitada.</small>
            </span>
            <input
              type="checkbox"
              checked={reduced}
              onChange={(e) => setReduced(e.target.checked)}
            />
          </label>
          <label className="toggle-row">
            <span>
              Aumentar contraste<small>Reforça textos e contornos.</small>
            </span>
            <input
              type="checkbox"
              checked={contrast}
              onChange={(e) => setContrast(e.target.checked)}
            />
          </label>
        </section>
        <section className="card settings-card">
          <span className="section-icon">
            <Icon name="ShieldCheck" />
          </span>
          <h2>Seus dados, sob seu controle</h2>
          <p>Baixe uma cópia dos seus check-ins e textos em um arquivo JSON.</p>
          <Button variant="secondary" icon="ArrowDownToLine" onClick={onExport}>
            Exportar {demo ? "dados de exemplo" : "meus registros"}
          </Button>
          <div className="danger-zone">
            <h3>Excluir meu espaço</h3>
            <p>
              Remove seu perfil, check-ins e diário do banco ativo. Esta ação
              não pode ser desfeita pela aplicação.
            </p>
            <Button
              variant="danger"
              icon="Trash2"
              onClick={onDelete}
              disabled={demo}
            >
              Excluir conta e registros
            </Button>
          </div>
        </section>
        <section className="settings-reflection">
          <Icon name="Leaf" size={38} />
          <h2>Você escolhe o ritmo.</h2>
          <p>
            O MindTrack não envia cobranças para registrar todos os dias. Você
            pode voltar quando fizer sentido.
          </p>
          <span>SEM METAS DE HUMOR. SEM RÓTULOS.</span>
        </section>
      </div>
    </>
  );
}
const reflections = [
  {
    icon: "BookOpen",
    tag: "AUTOCONHECIMENTO",
    title: "O que ficou do seu dia?",
    text: "Escolha um acontecimento que chamou sua atenção. Como você o percebeu? Não é preciso escrever muito ou encontrar uma conclusão.",
    prompt: "Hoje, algo que ficou comigo foi...",
    tone: "sage",
  },
  {
    icon: "Coffee",
    tag: "ROTINA",
    title: "Encontre uma pequena pausa.",
    text: "Pense em um momento da rotina em que você costuma fazer tudo no automático. Se quiser, pare por um instante e observe como está.",
    prompt: "Neste momento, eu percebo...",
    tone: "sand",
  },
  {
    icon: "Heart",
    tag: "REFLEXÃO",
    title: "Dias diferentes, necessidades diferentes.",
    text: "Seus registros podem variar. Você pode descrever essas diferenças sem precisar transformá-las em uma avaliação de si mesmo.",
    prompt: "Hoje, o que faria sentido para mim é...",
    tone: "lavender",
  },
];
export function ContentPage({ onWrite }) {
  return (
    <>
      <PageHeading
        eyebrow="UM CONVITE À REFLEXÃO"
        title="Um pouco de espaço entre os dias."
        text="Ideias para a escrita pessoal. Escolha apenas o que fizer sentido para você."
      />
      <div className="content-grid">
        {reflections.map((r) => (
          <article key={r.title} className={`reflection-article ${r.tone}`}>
            <span className="article-icon">
              <Icon name={r.icon} size={31} />
            </span>
            <p className="eyebrow">{r.tag}</p>
            <h2>{r.title}</h2>
            <p>{r.text}</p>
            <blockquote>“{r.prompt}”</blockquote>
            <button className="inline-link" onClick={() => onWrite(r.prompt)}>
              Levar para o meu diário
              <Icon name="ArrowRight" size={17} />
            </button>
          </article>
        ))}
      </div>
      <div className="info-note content-note">
        <Icon name="CircleHelp" />
        <p>
          Estes convites são propostas gerais de escrita, sem finalidade
          terapêutica. O MindTrack não substitui acompanhamento profissional.
        </p>
      </div>
    </>
  );
}
