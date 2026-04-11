import { AnimatePresence, motion } from "framer-motion";
import { useFormContext } from "../context/FormContext";
import { FORM_STATE } from "../../types";

export function SuccessView({ children }: { children: React.ReactNode }) {
  const { state } = useFormContext();
  return (
    <AnimatePresence initial={false}>
      {state === FORM_STATE.SUCCESS && (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10, position: "absolute", top: 0, left: 0, right: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="py-4"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
