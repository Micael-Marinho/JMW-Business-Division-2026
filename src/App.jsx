import { useEffect, useRef, useState } from "react";
import Landing from "./views/Landing";
import Overview, { History } from "./views/Overview";
import { AuthPage, CheckinForm, DiaryEditor } from "./views/Forms";
import { About, SettingsPage, ContentPage } from "./views/Details";
import {
  Brand,
  Button,
  Icon,
  Modal,
  Empty,
  ErrorNotice,
  PageHeading,
  AcademicFooter,
} from "./components/UI";
import { dateLabel } from "./components/Chart";
import { api } from "./services/api";
import { demoRecords } from "./services/demo";
import { todayISO, validateDiary } from "./domain/wellbeing";
const navItems = [
  { key: "overview", label: "Meu espaço", icon: "LayoutDashboard" },
  { key: "checkin", label: "Check-in", icon: "Heart" },
  { key: "history", label: "Minha evolução", icon: "TrendingUp" },
  { key: "diary", label: "Meu diário", icon: "BookOpen" },
  { key: "content", label: "Uma pausa", icon: "Leaf" },
];
const publicViews = ["landing", "cadastro", "login", "about"];
const allowedViews = [
  ...publicViews,
  ...navItems.map((n) => n.key),
  "settings",
];
export default function MindTrack() {
  const [view, setView] = useState("landing"),
    [user, setUser] = useState(null);
  const [records, setRecords] = useState([]),
    [diaries, setDiaries] = useState([]),
    [demo, setDemo] = useState(false);
  const [days, setDays] = useState(14),
    [editing, setEditing] = useState(null),
    [dialog, setDialog] = useState(null);
  const [theme, setTheme] = useState("system"),
    [effectiveTheme, setEffectiveTheme] = useState("light"),
    [reduced, setReduced] = useState(false),
    [contrast, setContrast] = useState(false);
  const [toast, setToast] = useState(""),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(false),
    [mobileNav, setMobileNav] = useState(false);
  const mainRef = useRef(null);
  function navigate(next) {
    setView(next);
    setMobileNav(false);
    setError("");
    const url = new URL(window.location.href);
    url.searchParams.set("view", next);
    url.hash = "";
    window.history.pushState({}, "", url);
    window.scrollTo(0, 0);
    setTimeout(() => mainRef.current?.focus(), 0);
  }
  async function loadData() {
    setLoading(true);
    try {
      const [c, d] = await Promise.all([api("checkins"), api("diaries")]);
      setRecords(c.records);
      setDiaries(d.records);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    const read = (key) => {
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    };
    setTheme(read("mindtrack-theme") || "system");
    setReduced(read("mindtrack-motion") === "true");
    setContrast(read("mindtrack-contrast") === "true");
    const requested = new URL(window.location.href).searchParams.get("view");
    if (publicViews.includes(requested)) setView(requested);
    api("session")
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          setView(
            allowedViews.includes(requested) &&
              !["cadastro", "login"].includes(requested)
              ? requested
              : "overview",
          );
          loadData();
        }
      })
      .catch((err) => {
        if (err.status !== 401)
          setError(
            "Não foi possível verificar sua sessão. Atualize a página para tentar novamente.",
          );
      });
  }, []);
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const t = theme === "system" ? (media.matches ? "dark" : "light") : theme;
      document.documentElement.dataset.theme = t;
      setEffectiveTheme(t);
    };
    apply();
    media.addEventListener("change", apply);
    try {
      localStorage.setItem("mindtrack-theme", theme);
    } catch {
      /* Preferências locais não impedem o uso. */
    }
    return () => media.removeEventListener("change", apply);
  }, [theme]);
  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? "reduced" : "normal";
    document.documentElement.dataset.contrast = contrast ? "high" : "normal";
    try {
      localStorage.setItem("mindtrack-motion", String(reduced));
      localStorage.setItem("mindtrack-contrast", String(contrast));
    } catch {
      /* Sem persistência de preferência, a sessão continua. */
    }
  }, [reduced, contrast]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 4500);
    return () => clearTimeout(t);
  }, [toast]);
  useEffect(() => {
    const pop = () => {
      const next =
        new URL(window.location.href).searchParams.get("view") || "landing";
      setView(
        allowedViews.includes(next) && (user || publicViews.includes(next))
          ? next
          : "landing",
      );
      setMobileNav(false);
    };
    window.addEventListener("popstate", pop);
    return () => window.removeEventListener("popstate", pop);
  }, [user]);
  function startDemo() {
    setDemo(true);
    setUser({ id: "demo", name: "Visitante" });
    setRecords(demoRecords());
    setDiaries([
      {
        id: "demo-diary",
        title: "Os detalhes que ficam",
        body: "Hoje encontrei um tempo para caminhar. Este é um texto de exemplo para apresentar o diário; não pertence a uma pessoa real.",
        createdAt: new Date().toISOString(),
      },
    ]);
    navigate("overview");
  }
  function requireReal() {
    if (demo)
      throw new Error(
        "Esta é uma demonstração. Saia do modo de exemplo e crie seu espaço para salvar registros.",
      );
  }
  function openCheckin(record = null) {
    setEditing(record);
    navigate("checkin");
  }
  async function saveCheckin(data, id) {
    requireReal();
    const result = await api(
      id ? `checkins/${id}` : "checkins",
      id ? "PATCH" : "POST",
      data,
    );
    setRecords((old) =>
      id
        ? old.map((r) => (r.id === id ? result.record : r))
        : [...old, result.record],
    );
    setToast(
      id ? "Seu registro foi atualizado." : "Seu momento está guardado.",
    );
    setEditing(null);
    navigate("overview");
  }
  async function saveDiary(data, id) {
    requireReal();
    validateDiary(data);
    await api(id ? `diaries/${id}` : "diaries", id ? "PATCH" : "POST", data);
    await loadData();
    setDialog(null);
    setToast("Seu texto está guardado.");
  }
  async function auth(data, register) {
    const result = await api(
      register ? "auth/register" : "auth/login",
      "POST",
      data,
    );
    setUser(result.user);
    setDemo(false);
    setRecords([]);
    setDiaries([]);
    await loadData();
    navigate("overview");
    setToast("Seu espaço está pronto.");
  }
  async function logout() {
    if (!demo) {
      try {
        await api("auth/logout", "POST", {});
      } catch (err) {
        setError(err.message);
        return;
      }
    }
    setUser(null);
    setDemo(false);
    setRecords([]);
    setDiaries([]);
    setEditing(null);
    setDialog(null);
    navigate("landing");
  }
  async function exportData() {
    try {
      const data = demo
        ? { demonstration: true, profile: user, checkins: records, diaries }
        : await api("export");
      const url = URL.createObjectURL(
        new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }),
      );
      const a = document.createElement("a");
      a.href = url;
      a.download = `mindtrack-${demo ? "exemplo-" : ""}${todayISO()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setToast("Sua cópia foi preparada.");
    } catch (err) {
      setError(err.message);
    }
  }
  async function confirmedDelete(confirm) {
    requireReal();
    if (dialog.kind === "account") {
      await api("profile", "DELETE", { confirm });
      setDialog(null);
      setUser(null);
      setRecords([]);
      setDiaries([]);
      navigate("landing");
      setToast("Seu perfil e os registros foram excluídos do banco ativo.");
      return;
    }
    await api(`${dialog.kind}/${dialog.record.id}`, "DELETE", {});
    if (dialog.kind === "checkins")
      setRecords((old) => old.filter((r) => r.id !== dialog.record.id));
    else setDiaries((old) => old.filter((r) => r.id !== dialog.record.id));
    setDialog(null);
    setToast("Registro excluído.");
  }
  const toastElement = toast && (
    <div className="toast" role="status">
      <Icon name="Check" size={18} />
      {toast}
    </div>
  );
  const modal =
    dialog &&
    (dialog.type === "diary" ? (
      <Modal
        title={
          dialog.record?.id
            ? "Revisitar meu texto"
            : "Um espaço para suas palavras"
        }
        onClose={() => setDialog(null)}
      >
        <DiaryEditor
          initial={dialog.record}
          onSave={saveDiary}
          onCancel={() => setDialog(null)}
        />
      </Modal>
    ) : dialog.type === "privacy" ? (
      <Modal title="Termos e privacidade" onClose={() => setDialog(null)}>
        <div className="privacy-modal">
          <About />
        </div>
      </Modal>
    ) : (
      <Modal
        title={
          dialog.kind === "account"
            ? "Excluir meu espaço"
            : "Excluir este registro?"
        }
        onClose={() => setDialog(null)}
      >
        <DeleteConfirmation
          kind={dialog.kind}
          onConfirm={confirmedDelete}
          onCancel={() => setDialog(null)}
        />
      </Modal>
    ));
  const commonLanding = {
    onStart: () => navigate(user ? "overview" : "cadastro"),
    onLogin: () => navigate(user ? "overview" : "login"),
    onDemo: startDemo,
    onAbout: () => navigate("about"),
    theme: effectiveTheme,
    onTheme: () => setTheme(effectiveTheme === "dark" ? "light" : "dark"),
  };
  if (!user || publicViews.includes(view)) {
    return (
      <>
        {view === "about" ? (
          <About
            standalone
            onBack={() => navigate(user ? "overview" : "landing")}
          />
        ) : ["cadastro", "login"].includes(view) ? (
          <AuthPage
            key={view}
            kind={view}
            onSubmit={auth}
            onBack={() => navigate("landing")}
            onSwitch={() =>
              navigate(view === "cadastro" ? "login" : "cadastro")
            }
            onPrivacy={() => setDialog({ type: "privacy" })}
          />
        ) : (
          <Landing {...commonLanding} />
        )}
        {error && (
          <div className="global-error" role="alert">
            {error}
          </div>
        )}
        {toastElement}
        {modal}
      </>
    );
  }
  return (
    <div className="app-shell">
      <a className="skip-link" href="#app-main">
        Ir para o conteúdo
      </a>
      <aside className={`sidebar ${mobileNav ? "mobile-open" : ""}`}>
        <button className="brand-button" onClick={() => navigate("overview")}>
          <Brand />
        </button>
        <p className="nav-caption">SUA JORNADA</p>
        <nav aria-label="Navegação principal">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={view === item.key ? "active" : ""}
              aria-current={view === item.key ? "page" : undefined}
              onClick={() => {
                if (item.key === "checkin") setEditing(null);
                navigate(item.key);
              }}
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
              {view === item.key && <span className="nav-dot" />}
            </button>
          ))}
        </nav>
        <div className="sidebar-pause">
          <span>
            <Icon name="Leaf" size={25} />
          </span>
          <p>
            Cada dia, um novo
            <br />
            jeito de se perceber.
          </p>
          <small>No seu tempo.</small>
        </div>
        <div className="sidebar-bottom">
          <button
            className={view === "settings" ? "active" : ""}
            onClick={() => navigate("settings")}
          >
            <Icon name="Settings" />
            Configurações
          </button>
          <button onClick={() => navigate("about")}>
            <Icon name="CircleHelp" />
            Sobre o projeto
          </button>
          <span className="sidebar-academic">
            JMW BUSINESS DIVISION 2026
            <br />
            <small>UTFPR · Desenvolvimento Ágil</small>
          </span>
        </div>
      </aside>
      {mobileNav && (
        <button
          className="sidebar-scrim"
          aria-label="Fechar menu"
          onClick={() => setMobileNav(false)}
        />
      )}
      <div className="app-body">
        <header className="topbar">
          <div>
            <button
              className="icon-button mobile-menu"
              aria-label="Abrir menu"
              aria-expanded={mobileNav}
              onClick={() => setMobileNav(!mobileNav)}
            >
              <Icon name="Menu" />
            </button>
            <span className="breadcrumb">
              Meu acompanhamento<span>/</span>
              <strong>
                {navItems.find((n) => n.key === view)?.label || "Configurações"}
              </strong>
            </span>
          </div>
          <div className="topbar-actions">
            <span className="date-today">
              <Icon name="CalendarDays" size={16} />
              {new Date(`${todayISO()}T12:00:00`).toLocaleDateString("pt-BR", {
                day: "numeric",
                month: "short",
              })}
            </span>
            <button
              className="icon-button"
              onClick={() =>
                setTheme(effectiveTheme === "dark" ? "light" : "dark")
              }
              aria-label="Alternar tema"
            >
              <Icon
                name={effectiveTheme === "dark" ? "Sun" : "Moon"}
                size={19}
              />
            </button>
            <button
              className="user-menu"
              onClick={() => navigate("settings")}
              aria-label="Abrir meu perfil"
            >
              <span>{user.name.slice(0, 1).toUpperCase()}</span>
              <div>
                <strong>{user.name.split(" ")[0]}</strong>
                <small>{demo ? "Modo de exemplo" : "Meu espaço pessoal"}</small>
              </div>
            </button>
            <button
              className="icon-button"
              onClick={logout}
              aria-label={demo ? "Sair da demonstração" : "Sair da conta"}
            >
              <Icon name="LogOut" size={18} />
            </button>
          </div>
        </header>
        {demo && (
          <div className="demo-banner">
            <span>
              <Icon name="CircleHelp" size={16} />
              Demonstração · Dados fictícios. Os formulários não salvam neste
              modo.
            </span>
            <button onClick={logout}>
              Sair do exemplo
              <Icon name="ArrowRight" size={15} />
            </button>
          </div>
        )}
        <main className="app-main" id="app-main" tabIndex="-1" ref={mainRef}>
          {error && (
            <div className="error-bar">
              <ErrorNotice error={error} />
              <Button variant="secondary" onClick={loadData}>
                Tentar novamente
              </Button>
            </div>
          )}
          {loading ? (
            <div
              className="skeleton-dashboard"
              role="status"
              aria-label="Carregando seus registros"
            >
              <div />
              <div />
              <div />
              <span>Carregando seu espaço...</span>
            </div>
          ) : view === "overview" ? (
            <Overview
              user={user}
              records={records}
              days={days}
              setDays={setDays}
              onCheckin={openCheckin}
              onHistory={() => navigate("history")}
              onDiary={() => navigate("diary")}
              onContent={() => navigate("content")}
            />
          ) : view === "checkin" ? (
            <CheckinForm
              key={editing?.id || "new"}
              initial={editing}
              onSave={saveCheckin}
              onCancel={() => {
                setEditing(null);
                navigate("overview");
              }}
            />
          ) : view === "history" ? (
            <History
              records={records}
              days={days}
              setDays={setDays}
              onEdit={openCheckin}
              onDelete={(record) =>
                setDialog({ type: "delete", kind: "checkins", record })
              }
            />
          ) : view === "diary" ? (
            <>
              <PageHeading
                eyebrow="PALAVRAS QUE MERECEM UM ESPAÇO"
                title="O que ficou do seu dia?"
                text="Guarde pensamentos, pequenos acontecimentos ou apenas o que você quiser."
              >
                <Button
                  icon="Plus"
                  onClick={() => setDialog({ type: "diary" })}
                >
                  Escrever no diário
                </Button>
              </PageHeading>
              <div className="diary-privacy">
                <Icon name="LockKeyhole" size={17} />
                Seus textos são privados na aplicação e não aparecem em
                indicadores.
              </div>
              {diaries.length ? (
                <div className="diary-grid">
                  {diaries.map((d) => (
                    <article className="diary-card card" key={d.id}>
                      <div>
                        <Icon name="BookOpen" size={23} />
                        <small>
                          {new Date(d.createdAt).toLocaleDateString("pt-BR")}
                        </small>
                      </div>
                      <h2>{d.title}</h2>
                      <p>{d.body}</p>
                      <footer>
                        <button
                          className="inline-link"
                          onClick={() =>
                            setDialog({ type: "diary", record: d })
                          }
                        >
                          Ler e editar
                          <Icon name="ArrowRight" size={15} />
                        </button>
                        <button
                          className="icon-button"
                          aria-label={`Excluir texto ${d.title}`}
                          onClick={() =>
                            setDialog({
                              type: "delete",
                              kind: "diaries",
                              record: d,
                            })
                          }
                        >
                          <Icon name="Trash2" size={17} />
                        </button>
                      </footer>
                    </article>
                  ))}
                </div>
              ) : (
                <section className="card">
                  <Empty
                    title="Um lugar para o que você quiser guardar"
                    text="Você pode começar com uma frase. Seu texto não precisa estar pronto para ser importante para você."
                    action={
                      <Button
                        variant="secondary"
                        icon="BookOpen"
                        onClick={() => setDialog({ type: "diary" })}
                      >
                        Escrever meu primeiro texto
                      </Button>
                    }
                  />
                </section>
              )}
            </>
          ) : view === "content" ? (
            <ContentPage
              onWrite={(body) => setDialog({ type: "diary", record: { body } })}
            />
          ) : (
            <SettingsPage
              user={user}
              theme={theme}
              setTheme={setTheme}
              reduced={reduced}
              setReduced={setReduced}
              contrast={contrast}
              setContrast={setContrast}
              demo={demo}
              onUpdate={async (name) => {
                requireReal();
                const data = await api("profile", "PATCH", { name });
                setUser(data.user);
                setToast("Seu nome foi atualizado.");
              }}
              onExport={exportData}
              onDelete={() => setDialog({ type: "delete", kind: "account" })}
            />
          )}
        </main>
        <AcademicFooter />
      </div>
      {toastElement}
      {modal}
    </div>
  );
}
function DeleteConfirmation({ kind, onConfirm, onCancel }) {
  const [confirm, setConfirm] = useState(""),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await onConfirm(confirm);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <form onSubmit={submit} className="delete-form">
      <p>
        {kind === "account"
          ? "Seu perfil, check-ins e textos serão removidos do banco ativo. Antes de continuar, você pode exportar uma cópia nas configurações."
          : "Este registro será removido. Você não poderá recuperá-lo pela aplicação."}
      </p>
      {kind === "account" && (
        <label htmlFor="delete-confirm">
          Digite EXCLUIR para confirmar
          <input
            id="delete-confirm"
            autoComplete="off"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </label>
      )}
      <ErrorNotice error={error} />
      <div className="form-actions">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="danger"
          disabled={busy || (kind === "account" && confirm !== "EXCLUIR")}
        >
          {busy ? "Excluindo..." : "Confirmar exclusão"}
        </Button>
      </div>
    </form>
  );
}
