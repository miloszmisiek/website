import { useFormContext } from "../context/FormContext";
import { FORM_STATE } from "../../types";

const STATUS_LABELS: Record<string, string> = {
  [FORM_STATE.LOADING]: "{ status: sending }",
  [FORM_STATE.ERROR]: "{ status: error }",
};

export function StatusText() {
  const { state } = useFormContext();
  const label = STATUS_LABELS[state] ?? "{ status: ready }";

  return (
    <span className="text-micro font-mono text-foreground/45 tracking-widest select-none">
      {label}
    </span>
  );
}
