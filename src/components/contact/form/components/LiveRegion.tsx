// GOOD
import { useFormContext } from "../context/FormContext";
import { FORM_STATE } from "../../constants";
import type { FormState } from "../../types";

const { SUCCESS, ERROR } = FORM_STATE;

type LiveRegionProps = {
  successText: string;
  errorText: string;
};
type MessageText = Partial<Record<FormState, string>>;

export function LiveRegion({ successText, errorText }: LiveRegionProps) {
  const { state } = useFormContext();
  const message: MessageText = {
    [SUCCESS]: successText,
    [ERROR]: errorText,
  };

  return (
    <div aria-live="polite" aria-atomic="true" className="sr-only">
      {message[state] ?? ""}
    </div>
  );
}
