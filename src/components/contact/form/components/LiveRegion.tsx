import { useFormContext } from "../context/FormContext";
import { FORM_STATE } from "../../types";

export function LiveRegion({
  successText,
  errorText,
}: {
  successText: string;
  errorText: string;
}) {
  const { state } = useFormContext();
  return (
    <div aria-live="polite" aria-atomic="true" className="sr-only">
      {state === FORM_STATE.SUCCESS ? successText : ""}
      {state === FORM_STATE.ERROR ? errorText : ""}
    </div>
  );
}
