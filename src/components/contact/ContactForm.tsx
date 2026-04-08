"use client";

import { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getTranslations } from "../../i18n";

type FormState = "idle" | "loading" | "success" | "error";

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function IconSpinner({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83"
      />
    </svg>
  );
}

function IconArrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      />
    </svg>
  );
}

function IconCheck({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 12.75 6 6 9-13.5"
      />
    </svg>
  );
}

function IconWarning({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Shared input style — underline-only, no box
// ---------------------------------------------------------------------------

const inputBase =
  "w-full bg-transparent border-b border-foreground/20 px-0 py-3 text-base font-sans text-foreground " +
  "placeholder:text-foreground/40 " +
  "transition-[border-color] duration-200 " +
  "focus-visible:outline-none focus-visible:border-foreground/50 " +
  "hover:border-foreground/30 " +
  "disabled:opacity-40 disabled:cursor-not-allowed";

// ---------------------------------------------------------------------------
// Field row — horizontal rule on top, label, input, optional error
// ---------------------------------------------------------------------------

function FieldRow({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="pt-6 pb-1">
      <label
        htmlFor={id}
        className="block text-[10px] font-mono uppercase tracking-[0.2em] text-muted mb-2"
      >
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            key="err"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="block mt-2 text-[10px] font-mono text-red-400/90 tracking-wide"
            role="alert"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function ContactForm() {
  const t = getTranslations();

  const nameId = useId();
  const emailId = useId();
  const messageId = useId();
  const statusRegionId = useId();

  const [state, setState] = useState<FormState>("idle");
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  function validate(data: { name: string; email: string; message: string }) {
    const errors: typeof fieldErrors = {};
    if (!data.name.trim()) errors.name = "Required";
    if (!data.email.trim()) {
      errors.email = "Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "Invalid email address";
    }
    if (!data.message.trim()) errors.message = "Required";
    return errors;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    const errors = validate(data);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      const firstKey = Object.keys(errors)[0] as "name" | "email" | "message";
      (form.elements.namedItem(firstKey) as HTMLElement)?.focus();
      return;
    }

    setFieldErrors({});
    setState("loading");

    // --- UI-only: simulate async submission ---
    // To wire Formspree: replace the timeout with:
    //   const res = await fetch('https://formspree.io/f/YOUR_ID', {
    //     method: 'POST', body: JSON.stringify(data),
    //     headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    //   });
    //   if (res.ok) { setState('success'); } else { setState('error'); }
    await new Promise((r) => setTimeout(r, 1400));
    setState("success");
  }

  return (
    <div>
      {/* Screen reader status region */}
      <div
        id={statusRegionId}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {state === "success" && t("contact.form.success")}
        {state === "error" && t("contact.form.error")}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {/* ── Success state ── */}
        {state === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="py-4"
          >
            <div className="border-t border-foreground/10" />
            <div className="pt-10 pb-2 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border border-emerald-500/30 bg-emerald-500/10 shrink-0">
                  <IconCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-sm font-sans text-foreground/80 leading-relaxed">
                  {t("contact.form.success")}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setState("idle")}
                className="w-fit text-[10px] font-mono text-muted/80 hover:text-foreground/70 tracking-widest uppercase transition-colors duration-200 cursor-pointer"
              >
                {"[ reset ]"}
              </button>
            </div>
          </motion.div>
        ) : (
          /* ── Form state (idle / loading / error) ── */
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="border-t border-foreground/10" />
            {/* Name */}
            <FieldRow
              id={nameId}
              label={t("contact.form.name.label")}
              error={fieldErrors.name}
            >
              <input
                id={nameId}
                name="name"
                type="text"
                autoComplete="name"
                placeholder={t("contact.form.name.placeholder")}
                className={inputBase}
                disabled={state === "loading"}
              />
            </FieldRow>

            {/* Email */}
            <FieldRow
              id={emailId}
              label={t("contact.form.email.label")}
              error={fieldErrors.email}
            >
              <input
                id={emailId}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                spellCheck={false}
                placeholder={t("contact.form.email.placeholder")}
                className={inputBase}
                disabled={state === "loading"}
              />
            </FieldRow>

            {/* Message */}
            <FieldRow
              id={messageId}
              label={t("contact.form.message.label")}
              error={fieldErrors.message}
            >
              <textarea
                id={messageId}
                name="message"
                rows={5}
                placeholder={t("contact.form.message.placeholder")}
                className={`${inputBase} resize-none leading-relaxed`}
                disabled={state === "loading"}
              />
            </FieldRow>

            {/* Error banner */}
            <AnimatePresence>
              {state === "error" && (
                <motion.div
                  key="error-banner"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                  role="alert"
                >
                  <div className="flex items-center gap-2.5 py-3 mt-3">
                    <IconWarning className="w-3.5 h-3.5 text-red-400/90 shrink-0" />
                    <span className="text-[11px] font-mono text-red-400/90 tracking-wide">
                      {t("contact.form.error")}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit row */}
            <div className="flex items-center justify-between pt-6 pb-1">
              <span className="text-[10px] font-mono text-foreground/45 tracking-widest select-none">
                {"{ status: ready }"}
              </span>
              <button
                type="submit"
                disabled={state === "loading"}
                className="group inline-flex items-center gap-2.5 button-primary cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {state === "loading" ? (
                  <>
                    <IconSpinner className="w-3 h-3 animate-spin" />
                    {t("contact.form.sending")}
                  </>
                ) : (
                  <>
                    {t("contact.form.submit")}
                    <IconArrow className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
