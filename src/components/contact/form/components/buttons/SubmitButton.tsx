import { Button } from "../../../../button/Button";
import { useFormContext } from "../../context/FormContext";
import { FORM_STATE } from "../../../constants";
import type { PropsWithChildren } from "react";

export function SubmitButton({ children }: PropsWithChildren) {
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
