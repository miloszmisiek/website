import { AnimatePresence, motion } from "framer-motion";
import { useFormContext } from "../context/FormContext";
import { FORM_STATE } from "../../constants";
import type { PropsWithChildren } from "react";
import { FADE_SLIDE_ANIMATION } from "../animations";

const { SUCCESS } = FORM_STATE;

export function SuccessView({ children }: PropsWithChildren) {
  const { state } = useFormContext();
  return (
    <AnimatePresence initial={false}>
      {state === SUCCESS && (
        <motion.div key={SUCCESS} {...FADE_SLIDE_ANIMATION} className="py-4">
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
