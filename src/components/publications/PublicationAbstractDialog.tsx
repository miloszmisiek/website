import { createContext, useCallback, useContext, useMemo, useRef } from "react";
import { getTranslations } from "../../i18n";
import { Button } from "../button/Button";

// ─── Context ─────────────────────────────────────────────────────────────────

type DialogContextValue = {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  open: () => void;
  close: () => void;
};

const PublicationAbstractDialogContext =
  createContext<DialogContextValue | null>(null);

function usePublicationAbstractDialogContext(): DialogContextValue {
  const ctx = useContext(PublicationAbstractDialogContext);
  if (!ctx)
    throw new Error("Must be used inside <PublicationAbstractDialogProvider>");
  return ctx;
}

// ─── Static JSX (hoisted — rendering-hoist-jsx) ──────────────────────────────

const CloseIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ─── Root ────────────────────────────────────────────────────────────────────

export function PublicationAbstractDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const open = useCallback(() => dialogRef.current?.showModal(), []);
  const close = useCallback(() => dialogRef.current?.close(), []);
  const ctx = useMemo(() => ({ dialogRef, open, close }), [open, close]);

  return (
    <PublicationAbstractDialogContext.Provider value={ctx}>
      {children}
    </PublicationAbstractDialogContext.Provider>
  );
}

// ─── Trigger ─────────────────────────────────────────────────────────────────

PublicationAbstractDialog.Trigger = function Trigger() {
  const { open } = usePublicationAbstractDialogContext();
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        open();
      }}
    >
      more
    </Button>
  );
};

// ─── Panel ───────────────────────────────────────────────────────────────────

PublicationAbstractDialog.Panel = function Panel({
  children,
}: {
  children: React.ReactNode;
}) {
  const { dialogRef, close } = usePublicationAbstractDialogContext();
  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="pub-dialog-title"
      aria-modal="true"
      className="publication-dialog"
      onClick={(e) => {
        if (e.target === dialogRef.current) close();
      }}
    >
      {children}
    </dialog>
  );
};

// ─── Header ──────────────────────────────────────────────────────────────────

PublicationAbstractDialog.Header = function Header() {
  const { close } = usePublicationAbstractDialogContext();
  const t = getTranslations();
  return (
    <div className="flex items-center justify-between px-8 py-5 lg:px-10 border-b border-border/70">
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted/70">
        {t("publication.abstract")}
      </span>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        aria-label="Close"
        className="text-muted hover:text-foreground"
        onClick={close}
      >
        {CloseIcon}
      </Button>
    </div>
  );
};

// ─── Body ────────────────────────────────────────────────────────────────────

type BodyProps = {
  title: string;
  authors: string[];
  excerpt?: string;
};

PublicationAbstractDialog.Body = function Body({
  title,
  authors,
  excerpt,
}: BodyProps) {
  return (
    <div className="px-8 py-8 lg:px-10 space-y-6 max-h-[70vh] overflow-y-auto">
      <div>
        <h3
          id="pub-dialog-title"
          className="text-heading-md mb-4 text-foreground"
        >
          {title}
        </h3>
        {authors.length > 0 && (
          <p className="font-mono text-xs uppercase tracking-widest flex flex-wrap items-center gap-2">
            <span className="text-foreground/40">{"{ author(s): "}</span>
            <span className="text-foreground/80 tracking-wide">
              {authors.join(", ")}
            </span>
            <span className="text-foreground/40">{" }"}</span>
          </p>
        )}
      </div>
      {excerpt && (
        <p className="text-body text-muted/80 pl-4 border-l-2 border-border/70 leading-relaxed">
          {excerpt}
        </p>
      )}
    </div>
  );
};

// ─── Footer ──────────────────────────────────────────────────────────────────

type FooterProps = {
  year?: number;
  doi?: string;
  link?: string;
};

PublicationAbstractDialog.Footer = function Footer({
  year,
  doi,
  link,
}: FooterProps) {
  const t = getTranslations();
  return (
    <div className="flex items-center justify-between px-8 py-5 lg:px-10 border-t border-border/70">
      <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-muted/70">
        {year && <span>{year}</span>}
        {doi && (
          <span className="flex items-center gap-2 border-l border-border/70 pl-4">
            <span className="text-foreground/40">doi:</span> {doi}
          </span>
        )}
      </div>
      {link && (
        <Button
          href={link}
          variant="secondary"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("publication.viewPaper")}
        </Button>
      )}
    </div>
  );
};
