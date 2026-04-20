import { Button } from "../../../button/Button";
import { useFormContext } from "../context/FormContext";
import { FORM_STATE } from "../../types";

export function SubmitButton({ children }: { children: React.ReactNode }) {
  const { state } = useFormContext();
  return (
    <Button
      type="submit"
      variant="primary"
      disabled={state === FORM_STATE.LOADING}
      className="group relative"
    >
      {children}
    </Button>
  );
}

export function SubmitIdle({ children }: { children: React.ReactNode }) {
  const { state } = useFormContext();
  return (
    <span
      className={`inline-flex items-center gap-2.5 transition-opacity duration-150 ${
        state === FORM_STATE.LOADING ? "opacity-0" : "opacity-100"
      }`}
    >
      {children}
    </span>
  );
}

export function SubmitLoading({ children }: { children: React.ReactNode }) {
  const { state } = useFormContext();
  if (state !== FORM_STATE.LOADING) return null;
  return (
    <span className="absolute inset-0 flex items-center justify-center">
      {children}
    </span>
  );
}
