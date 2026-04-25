import { motion, AnimatePresence } from "framer-motion";
import { useFormContext } from "../context/FormContext";
import { useFieldContext } from "../context/FieldContext";

export function FieldError() {
  const { name } = useFieldContext();
  const { errors } = useFormContext();
  const error = errors[name];

  return (
    <AnimatePresence>
      {error && (
        <motion.span
          key={`err-${name}`}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
          className="block mt-2 text-micro font-mono text-red-400/90 tracking-wide"
          role="alert"
        >
          {error}
        </motion.span>
      )}
    </AnimatePresence>
  );
}
