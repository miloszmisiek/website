import { useFieldContext } from "../context/FieldContext";

export function Label({ children }: { children: React.ReactNode }) {
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
