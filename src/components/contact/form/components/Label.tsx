import type { PropsWithChildren } from "react";
import { useFieldContext } from "../context/FieldContext";

export function Label({ children }: PropsWithChildren) {
  const { id } = useFieldContext();
  return (
    <label
      htmlFor={id}
      className="block text-micro font-mono uppercase tracking-technical text-muted mb-2"
    >
      {children}
    </label>
  );
}
