// GOOD
import { type PropsWithChildren } from "react";
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
      <div className={cn("relative", className)}>{children}</div>
    </FormContext.Provider>
  );
}
