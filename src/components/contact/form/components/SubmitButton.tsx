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
      className="group gap-2.5"
    >
      {children}
    </Button>
  );
}

export function SubmitIdle({ children }: { children: React.ReactNode }) {
  const { state } = useFormContext();
  if (state === FORM_STATE.LOADING) return null;
  return <>{children}</>;
}

export function SubmitLoading({ children }: { children: React.ReactNode }) {
  const { state } = useFormContext();
  if (state !== FORM_STATE.LOADING) return null;
  return <>{children}</>;
}
