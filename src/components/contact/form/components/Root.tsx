// GOOD
import { useState, type PropsWithChildren } from "react";
import { FormContext } from "../context/FormContext";
import { FORM_STATE, EMAIL_REGEX } from "../../constants";
import { getTranslations } from "../../../../i18n";
import { cn } from "../../../../styles/cn";
import type { FormState, ContactFieldName, FieldErrors } from "../../types";

const { IDLE, LOADING, SUCCESS, ERROR } = FORM_STATE;

export function Root({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  const { state, errors, clearFieldError, resetForm, submitForm } =
    useFormData();
  return (
    <FormContext.Provider
      value={{ state, errors, clearFieldError, resetForm, submitForm }}
    >
      <div className={cn("relative", className)}>{children}</div>
    </FormContext.Provider>
  );
}

const validate = (data: Record<ContactFieldName, string>): FieldErrors => {
  const t = getTranslations();
  const errors: FieldErrors = {};
  if (!data.name.trim()) errors.name = t("contact.errors.required");

  if (!data.email.trim()) {
    errors.email = t("contact.errors.required");
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = t("contact.errors.invalidEmail");
  }

  if (!data.message.trim()) errors.message = t("contact.errors.required");
  return errors;
}

const useFormData = () => {
  const [state, setState] = useState<FormState>(IDLE);
  const [errors, setErrors] = useState<FieldErrors>({});

  const clearFieldError = (field: ContactFieldName) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      return { ...prev, [field]: undefined };
    });
  }

  const resetForm = () => {
    setErrors({});
    setState(IDLE);
  }

  const submitForm = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state === LOADING) return;

    const form = e.currentTarget;
    const fd = new FormData(form);
    const data: Record<ContactFieldName, string> = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
    };

    const fieldErrors = validate(data);
    const errorNames = Object.keys(fieldErrors);

    if (errorNames.length > 0) {
      setErrors(fieldErrors);
      const first = errorNames[0] as ContactFieldName;
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    setErrors({});
    setState(LOADING);

    try {
      const payload = new URLSearchParams();
      payload.set("form-name", "contact");
      payload.set("name", data.name);
      payload.set("email", data.email);
      payload.set("message", data.message);

      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString(),
      });

      if (!res.ok) throw new Error("Netlify form submission failed");

      setState(SUCCESS);
    } catch {
      setState(ERROR);
    }
  }

  return { state, errors, clearFieldError, resetForm, submitForm };
}
