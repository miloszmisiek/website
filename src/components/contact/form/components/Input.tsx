import { useFormContext } from "../context/FormContext";
import { useFieldContext } from "../context/FieldContext";
import { cn } from "../../../../styles/cn";
import { INPUT_BASE, FORM_STATE } from "../../constants";

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "id" | "name"
>;
export function Input({ className, onChange, disabled, ...rest }: InputProps) {
  const { id, name } = useFieldContext();
  const { state, errors, clearFieldError } = useFormContext();
  const error = errors[name];
  const isDisabled = state === FORM_STATE.LOADING || disabled;

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) clearFieldError(name);
    onChange?.(e);
  };

  return (
    <input
      {...rest}
      id={id}
      name={name}
      className={cn(INPUT_BASE, className)}
      aria-invalid={!!error}
      disabled={isDisabled}
      onChange={onInputChange}
    />
  );
}
