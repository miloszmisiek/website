// GOOD
import { AnimatePresence, motion } from "framer-motion";
import { useFormContext } from "../context/FormContext";
import { FORM_STATE } from "../../constants";

const TICKER_ANIMATION = {
  initial: { y: "-100%", opacity: 0 },
  animate: { y: "0%", opacity: 1 },
  exit: { y: "100%", opacity: 0 },
  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const },
};

const STATUS_LABELS = {
  [FORM_STATE.IDLE]: "ready",
  [FORM_STATE.LOADING]: "sending",
  [FORM_STATE.SUCCESS]: "sent",
  [FORM_STATE.ERROR]: "error",
};

export function StatusText() {
  const { state } = useFormContext();
  const label = STATUS_LABELS[state];

  return (
    <span className="text-micro font-mono text-foreground/45 tracking-widest select-none inline-flex items-center">
      {'{ status: "'}
      <span className="inline-block overflow-hidden align-bottom">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={label} className="inline-block" {...TICKER_ANIMATION}>
            {label}
          </motion.span>
        </AnimatePresence>
      </span>
      {'" }'}
    </span>
  );
}
