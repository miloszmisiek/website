import { useId, type PropsWithChildren } from "react";
import { FieldContext } from "../context/FieldContext";
import type { ContactFieldName } from "../../types";

export function Field({
  name,
  children,
}: PropsWithChildren<{ name: ContactFieldName }>) {
  const id = useId();
  return (
    <FieldContext.Provider value={{ id, name }}>
      <div className="pt-6 pb-1 short:pt-3">{children}</div>
    </FieldContext.Provider>
  );
}
