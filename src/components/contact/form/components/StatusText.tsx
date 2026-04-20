import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useFormContext } from "../context/FormContext";
import { FORM_STATE } from "../../types";

const STATUS_LABELS: Record<string, string> = {
  [FORM_STATE.IDLE]: "ready",
  [FORM_STATE.LOADING]: "sending",
  [FORM_STATE.SUCCESS]: "sent",
  [FORM_STATE.ERROR]: "error",
};

export function StatusText() {
  const { state } = useFormContext();
  const label = STATUS_LABELS[state] ?? "ready";
  const reduceMotion = useReducedMotion();

  return (
    <span className="text-micro font-mono text-foreground/45 tracking-widest select-none inline-flex items-center">
      {'{ status: "'}
      <span className="inline-block overflow-hidden align-bottom">
        {reduceMotion ? (
          <span>{label}</span>
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={label}
              className="inline-block"
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {label}
            </motion.span>
          </AnimatePresence>
        )}
      </span>
      {'" }'}
    </span>
  );
}
