// GOOD
import type { PropsWithChildren } from "react";
import { useFormContext } from "../../context/FormContext";

export function ResetButton({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  const { resetForm } = useFormContext();
  return (
    <button type="button" onClick={resetForm} className={className}>
      {children}
    </button>
  );
}
