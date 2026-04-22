// GOOD
import { useFormContext } from "../context/FormContext";
import { useFieldContext } from "../context/FieldContext";
import { cn } from "../../../../styles/cn";
import { FORM_STATE, INPUT_BASE } from "../../constants";
import type { TextareaHTMLAttributes } from "react";

type TextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "id" | "name"
>;
export function Textarea({
  className,
  disabled,
  onChange,
  ...props
}: TextareaProps) {
  const { id, name } = useFieldContext();
  const { state, errors, clearFieldError } = useFormContext();
  const error = errors[name];
  const isDisabled = state === FORM_STATE.LOADING || disabled;

  const onTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (error) clearFieldError(name);
    onChange?.(e);
  };

  return (
    <textarea
      {...props}
      id={id}
      name={name}
      className={cn(INPUT_BASE, className)}
      aria-invalid={!!error}
      disabled={isDisabled}
      onChange={onTextareaChange}
    />
  );
}
