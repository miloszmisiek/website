import { AnimatePresence, motion } from "framer-motion";
import { useFormContext } from "../context/FormContext";
import { FORM_STATE } from "../../constants";
import { EASE_SMOOTH } from "../../../../styles/animations";
import { cn } from "../../../../styles/cn";

const { SUCCESS, ERROR, LOADING } = FORM_STATE;

const TICKER_ANIMATION = {
  initial: { y: "-100%", opacity: 0 },
  animate: { y: "0%", opacity: 1 },
  exit: { y: "100%", opacity: 0 },
  transition: { duration: 0.3, ease: EASE_SMOOTH },
};

function getStatus(state: string, isTyping: boolean) {
  switch (state) {
    case SUCCESS:
      return '"message_sent"';
    case ERROR:
      return '"error"';
    case LOADING:
      return '"sending"';
    default:
      return isTyping ? '"typing"' : '"waiting_for_input"';
  }
}

export function StatusText() {
  const { state, isTyping } = useFormContext();
  const label = getStatus(state, isTyping);
  return (
    <span className="text-micro font-mono tracking-widest select-none hidden sm:inline-flex items-center">
      <span className="text-foreground/45">
        {"{ state: "}
        <span className="inline-block overflow-hidden align-bottom">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={label}
              className={cn(
                "inline-block",
                state === FORM_STATE.SUCCESS && "text-emerald-500/80",
                state === FORM_STATE.ERROR && "text-red-500/80",
              )}
              {...TICKER_ANIMATION}
            >
              {label}
            </motion.span>
          </AnimatePresence>
        </span>
        {" }"}
      </span>
    </span>
  );
}
