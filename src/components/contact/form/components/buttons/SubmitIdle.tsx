// GOOD
import { useFormContext } from "../../context/FormContext";
import { FORM_STATE } from "../../../constants";
import { cn } from "../../../../../styles/cn";
import type { PropsWithChildren } from "react";

export function SubmitIdle({ children }: PropsWithChildren) {
  const { state } = useFormContext();
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 transition-opacity duration-150",
        state === FORM_STATE.LOADING && "opacity-0",
      )}
    >
      {children}
    </span>
  );
}
