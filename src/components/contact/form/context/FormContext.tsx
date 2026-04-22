// GOOD
import { createContext, useContext } from "react";
import type { FormContextValue } from "../../types";

export const FormContext = createContext<FormContextValue | null>(null);

export function useFormContext(): FormContextValue {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error("Must be used inside Form.Root");
  return ctx;
}
