import { createContext, useContext } from "react";
import type { FieldContextValue } from "../../types";

export const FieldContext = createContext<FieldContextValue | null>(null);

export function useFieldContext(): FieldContextValue {
  const ctx = useContext(FieldContext);
  if (!ctx) throw new Error("Must be used inside Form.Field");
  return ctx;
}
