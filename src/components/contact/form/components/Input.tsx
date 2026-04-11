import { useFormContext } from "../context/FormContext";
import { useFieldContext } from "../context/FieldContext";
import { cn } from "../../../../styles/cn";
import { FORM_STATE, inputBase } from "../../types";

export function Input(
  props: Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "name">,
) {
  const { id, name } = useFieldContext();
  const { state, errors, clearFieldError } = useFormContext();
  const error = errors[name];

  return (
    <input
      {...props}
      id={id}
      name={name}
      className={cn(inputBase, props.className)}
      aria-invalid={!!error}
      disabled={state === FORM_STATE.LOADING || props.disabled}
      onChange={(e) => {
        if (errors[name]) clearFieldError(name);
        props.onChange?.(e);
      }}
    />
  );
}
