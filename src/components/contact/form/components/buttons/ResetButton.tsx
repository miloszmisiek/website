import type { PropsWithChildren } from "react";
import { useFormContext } from "../../context/FormContext";
import { Button } from "../../../../button/Button";

export function ResetButton({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  const { resetForm } = useFormContext();
  return (
    <Button type="button" variant="ghost" onClick={resetForm} className={className}>
      {children}
    </Button>
  );
}
