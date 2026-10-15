import { Brand, Button, Icon, Face, AcademicFooter } from "../components/UI";
export default function Landing({
  onStart,
  onLogin,
  onDemo,
  onAbout,
  theme,
  onTheme,
}) {
  return (
    <div className="landing">
      <a className="skip-link" href="#landing-main">
        Ir para o conteúdo
      </a>
      <nav className="landing-nav">
        <button
          className="brand-button"
          onClick={() => window.scrollTo({ top: 0, behavior: "auto" })}
          aria-label="MindTrack, início"
        >
          <Brand />
        </button>
        <div className="landing-links">
          <a href="#como-funciona">Como funciona</a>
          <a href="#privacidade">Seu espaço</a>
          <button onClick={onAbout}>O projeto</button>
        </div>
        <div className="nav-actions">
          <button
            className="icon-button"
            onClick={onTheme}
            aria-label={
              theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"
            }
          >
            <Icon name={theme === "dark" ? "Sun" : "Moon"} size={19} />
          </button>
          <button className="text-button" onClick={onLogin}>
            Entrar
          </button>
          <Button onClick={onStart}>
            Começar agora
            <Icon name="ArrowRight" size={17} />
          </Button>
        </div>
      </nav>
      <main id="landing-main">
        <section className="hero">
          <div className="hero-copy">
            <span className="pill">
              <span className="status-dot" />
              UM ESPAÇO PARA VOCÊ
            </span>
            <h1>
              Conheça seus dias.
              <br />
              <em>Cuide do seu tempo.</em>
            </h1>
            <p>
              Às vezes, tudo o que precisamos é de uma pausa para perceber como
              estamos. Registre sua rotina e acompanhe seu bem-estar, um dia de
              cada vez.
            </p>
            <div className="hero-actions">
              <Button onClick={onStart}>
                Começar meu acompanhamento
                <Icon name="ArrowRight" size={18} />
              </Button>
              <button className="demo-link" onClick={onDemo}>
                <span className="play-icon">▷</span>Explorar demonstração
              </button>
            </div>
            <div className="hero-reassurance">
              <span>
                <Icon name="LockKeyhole" size={15} />
                Seus registros são privados
              </span>
              <span>
                <Icon name="Leaf" size={15} />
                Sem pressa. Sem julgamentos.
              </span>
            </div>
          </div>
          <div
            className="hero-art"
            aria-label="Ilustração de um espaço de equilíbrio, com dados de exemplo"
          >
            <div className="orb orb-one" />
            <div className="orb orb-two" />
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <span className="floating-leaf leaf-one">
              <Icon name="Leaf" size={48} />
            </span>
            <span className="floating-leaf leaf-two">
              <Icon name="Leaf" size={32} />
            </span>
            <div className="art-label">
              <span />
              PEQUENAS PAUSAS, NOVAS PERSPECTIVAS
            </div>
            <div className="hero-preview">
              <div className="preview-top">
                <span>Seu momento de hoje</span>
                <span className="example-tag">EXEMPLO</span>
              </div>
              <div className="preview-mood">
                <Face mood={4} size={48} />
                <div>
                  <strong>Hoje, me sinto bem.</strong>
                  <small>E cada dia pode ser diferente.</small>
                </div>
              </div>
              <div className="preview-bars">
                {[32, 53, 43, 73, 63, 86, 71].map((h, i) => (
                  <div key={i}>
                    <span style={{ height: h }} />
                    <small>{["S", "T", "Q", "Q", "S", "S", "D"][i]}</small>
                  </div>
                ))}
              </div>
              <div className="preview-bottom">
                <span>
                  <Icon name="TrendingUp" size={14} />
                  Um olhar sobre a sua semana
                </span>
                <Icon name="ArrowRight" size={15} />
              </div>
            </div>
            <div className="floating-note">
              <span className="note-icon">
                <Icon name="BookOpen" size={21} />
              </span>
              <div>
                <strong>Um lugar para suas ideias</strong>
                <small>Escreva. Respire. Recomece.</small>
              </div>
            </div>
          </div>
        </section>
        <div className="intro-strip">
          <p>
            Seu bem-estar não precisa caber em uma meta.
            <br />
            <strong>Ele merece um espaço na sua rotina.</strong>
          </p>
          <div>
            <Icon name="Heart" size={20} />
            <span>
              Feito para acolher
              <br />a sua própria jornada.
            </span>
          </div>
          <div>
            <Icon name="ShieldCheck" size={20} />
            <span>
              Você decide o que registrar.
              <br />
              Você mantém o controle.
            </span>
          </div>
        </div>
        <section id="como-funciona" className="section how-section">
          <div className="section-heading">
            <p className="eyebrow">SIMPLES, COMO UMA CONVERSA COM VOCÊ</p>
            <h2>
              Três passos.
              <br />
              <em>Mais espaço para se perceber.</em>
            </h2>
            <p>
              Não existe um jeito certo de sentir. Existe o seu jeito de
              observar.
            </p>
          </div>
          <div className="step-grid">
            {[
              {
                n: "01",
                icon: "Sun",
                title: "Faça uma pausa",
                text: "Como foi o seu dia? Registre humor, sono, estresse e energia em um check-in rápido.",
              },
              {
                n: "02",
                icon: "TrendingUp",
                title: "Olhe para o caminho",
                text: "Revisite seus registros e perceba como sua rotina muda ao longo do tempo.",
              },
              {
                n: "03",
                icon: "BookOpen",
                title: "Dê palavras ao que sente",
                text: "Use seu diário para guardar pequenas conquistas, pensamentos e o que fizer sentido para você.",
              },
            ].map((s) => (
              <article className="step-card" key={s.n}>
                <div>
                  <span className="step-icon">
                    <Icon name={s.icon} size={26} />
                  </span>
                  <span className="step-number">{s.n}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
        </section>
        <section id="privacidade" className="privacy-section">
          <div className="privacy-art" aria-hidden="true">
            <div className="privacy-circle">
              <Icon name="LockKeyhole" size={52} />
            </div>
            <span className="privacy-orbit" />
          </div>
          <div>
            <p className="eyebrow">UM ESPAÇO QUE É SEU</p>
            <h2>
              O que você sente
              <br />
              <em>merece cuidado.</em>
            </h2>
            <p>
              Seus check-ins e textos ficam vinculados à sua conta. Você pode
              consultar, editar, exportar e excluir seus registros quando
              quiser.
            </p>
            <div className="privacy-points">
              <span>
                <Icon name="Check" size={18} />
                Sem mural público de emoções
              </span>
              <span>
                <Icon name="Check" size={18} />
                Sem diagnósticos ou rótulos automáticos
              </span>
              <span>
                <Icon name="Check" size={18} />
                Com controle sobre os seus dados
              </span>
            </div>
            <button className="inline-link" onClick={onAbout}>
              Conheça o projeto e a política de privacidade
              <Icon name="ArrowRight" size={17} />
            </button>
          </div>
        </section>
        <section className="section faq-section">
          <div className="section-heading">
            <p className="eyebrow">ANTES DE COMEÇAR</p>
            <h2>
              Algumas dúvidas,
              <br />
              <em>respostas com calma.</em>
            </h2>
          </div>
          <div className="faq-list">
            {[
              [
                "O MindTrack faz diagnóstico?",
                "Não. O projeto organiza registros pessoais e indicadores descritivos. Não substitui psicoterapia, avaliação profissional ou atendimento emergencial.",
              ],
              [
                "Preciso registrar todos os dias?",
                "Você escolhe quando registrar. Dias sem check-in ficam sem resposta e não são tratados como humor baixo ou valor zero.",
              ],
              [
                "Quem pode ler meu diário?",
                "Os registros são consultados na aplicação apenas pela conta que os criou. Não existe uma tela administrativa para ler diários. Como em qualquer sistema hospedado, a operação da infraestrutura exige controles técnicos e acesso restrito.",
              ],
              [
                "Posso levar meus registros comigo?",
                "Sim. Nas configurações, você pode baixar uma cópia em JSON dos seus check-ins e textos. Também pode excluir sua conta e os registros associados.",
              ],
            ].map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <Icon name="Plus" size={18} />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="closing-cta">
          <Icon name="Leaf" size={31} />
          <h2>
            Um pequeno registro.
            <br />
            <em>Um momento só seu.</em>
          </h2>
          <p>Comece de onde você está.</p>
          <Button onClick={onStart}>
            Criar meu espaço
            <Icon name="ArrowRight" size={18} />
          </Button>
        </section>
      </main>
      <div className="landing-bottom">
        <Brand small />
        <button className="text-button" onClick={onAbout}>
          Sobre o projeto acadêmico
          <Icon name="ArrowRight" size={16} />
        </button>
      </div>
      <AcademicFooter />
    </div>
  );
}
