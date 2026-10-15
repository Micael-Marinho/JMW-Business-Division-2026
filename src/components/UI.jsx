import { useEffect, useRef } from "react";
import {
  Activity,
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Coffee,
  Heart,
  LayoutDashboard,
  Leaf,
  LockKeyhole,
  LogOut,
  Menu,
  Moon,
  Plus,
  Settings,
  ShieldCheck,
  Sparkles,
  Sun,
  Trash2,
  TrendingUp,
  X,
  Pencil,
  Wind,
  AlertCircle,
} from "lucide-react";
const icons = {
  Activity,
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Coffee,
  Heart,
  LayoutDashboard,
  Leaf,
  LockKeyhole,
  LogOut,
  Menu,
  Moon,
  Plus,
  Settings,
  ShieldCheck,
  Sparkles,
  Sun,
  Trash2,
  TrendingUp,
  X,
  Pencil,
  Wind,
  AlertCircle,
};
export function Icon({ name, size = 20, ...props }) {
  const I = icons[name] || Leaf;
  return <I size={size} strokeWidth={1.65} aria-hidden="true" {...props} />;
}
export function Brand({ small = false }) {
  return (
    <span className={`brand ${small ? "brand-small" : ""}`}>
      <span className="brand-symbol">
        <Icon name="Leaf" size={25} />
      </span>
      <span>
        mind<span className="brand-light">track</span>
        <span className="brand-dot">.</span>
      </span>
    </span>
  );
}
export function Face({ mood = 4, size = 34 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="17" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="14" cy="16" r="1.6" fill="currentColor" />
      <circle cx="26" cy="16" r="1.6" fill="currentColor" />
      <path
        d={
          mood === 1
            ? "M12 28 Q20 18 28 28"
            : mood === 2
              ? "M14 27 Q20 21 26 27"
              : mood === 3
                ? "M13 25 H27"
                : mood === 4
                  ? "M12 23 Q20 32 28 23"
                  : "M11 23 Q20 35 29 23 L11 23"
        }
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function Button({ children, variant = "primary", icon, ...props }) {
  return (
    <button className={`button button-${variant}`} {...props}>
      {icon && <Icon name={icon} size={18} />}
      {children}
    </button>
  );
}
export function Empty({ title, text, action, icon = "Leaf" }) {
  return (
    <div className="empty">
      <span className="empty-icon">
        <Icon name={icon} size={29} />
      </span>
      <h3>{title}</h3>
      <p>{text}</p>
      {action}
    </div>
  );
}
export function Modal({ title, children, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    ref.current?.showModal();
    return () => {
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="modal"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
    >
      <div className="modal-head">
        <h2>{title}</h2>
        <button
          className="icon-button"
          aria-label="Fechar janela"
          onClick={onClose}
        >
          <Icon name="X" />
        </button>
      </div>
      {children}
    </dialog>
  );
}
export function ErrorNotice({ error }) {
  return error ? (
    <p className="error-notice" role="alert">
      <Icon name="AlertCircle" size={18} />
      {error}
    </p>
  ) : null;
}
export function PageHeading({ eyebrow, title, text, children }) {
  return (
    <header className="page-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </div>
      {children}
    </header>
  );
}
export function AcademicFooter() {
  return (
    <footer className="academic-footer">
      <span>JMW Business Division 2026</span>
      <span>UTFPR · Cornélio Procópio · Desenvolvimento Ágil</span>
      <span>Uma ferramenta de autoconhecimento. Não realiza diagnóstico.</span>
    </footer>
  );
}
