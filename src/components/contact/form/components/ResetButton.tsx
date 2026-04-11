import { useFormContext } from "../context/FormContext";

export function ResetButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { resetForm } = useFormContext();
  return (
    <button type="button" onClick={resetForm} className={className}>
      {children}
    </button>
  );
}
