import { type PropsWithChildren } from "react";
import { motion } from "framer-motion";
import { FormContext } from "../context/FormContext";
import { cn } from "../../../../styles/cn";
import { useContactForm } from "../useContactForm";

export function Root({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  const { state, isTyping, errors, clearFieldError, resetForm, submitForm } =
    useContactForm();
  return (
    <FormContext.Provider
      value={{ state, isTyping, errors, clearFieldError, resetForm, submitForm }}
    >
      <motion.div layout className={cn("relative", className)}>
        {children}
      </motion.div>
    </FormContext.Provider>
  );
}
