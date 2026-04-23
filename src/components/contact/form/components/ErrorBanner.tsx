// GOOD
import { type PropsWithChildren } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFormContext } from "../context/FormContext";
import { IconWarning } from "../../icons/IconWarning";
import { FORM_STATE } from "../../constants";

export function ErrorBanner({ children }: PropsWithChildren) {
  const { state } = useFormContext();
  return (
    <AnimatePresence>
      {state === FORM_STATE.ERROR && (
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
            <span className="text-caption font-mono text-red-400/90 tracking-wide">
              {children}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
