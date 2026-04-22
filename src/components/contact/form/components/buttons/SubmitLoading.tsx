// GOOD
import { useFormContext } from "../../context/FormContext";
import { FORM_STATE } from "../../../constants";
import type { PropsWithChildren } from "react";

export function SubmitLoading({ children }: PropsWithChildren) {
  const { state } = useFormContext();
  if (state !== FORM_STATE.LOADING) return null;
  return (
    <span className="absolute inset-0 flex items-center justify-center">
      {children}
    </span>
  );
}
