import { useState } from "react";
import { FormContext } from "../context/FormContext";
import { FORM_STATE, EMAIL_REGEX } from "../../types";
import type { FormState, ContactFieldName, FieldErrors } from "../../types";

function validate(data: Record<ContactFieldName, string>): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.name.trim()) errors.name = "Required";
  if (!data.email.trim()) {
    errors.email = "Required";
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = "Invalid email address";
  }
  if (!data.message.trim()) errors.message = "Required";
  return errors;
}

export function Root({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [state, setState] = useState<FormState>(FORM_STATE.IDLE);
  const [errors, setErrors] = useState<FieldErrors>({});

  function clearFieldError(field: ContactFieldName) {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      return { ...prev, [field]: undefined };
    });
  }

  function resetForm() {
    setErrors({});
    setState(FORM_STATE.IDLE);
  }

  async function submitForm(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === FORM_STATE.LOADING) return;

    const form = e.currentTarget;
    const fd = new FormData(form);
    const data: Record<ContactFieldName, string> = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
    };

    const fieldErrors = validate(data);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      const first = Object.keys(fieldErrors)[0] as ContactFieldName;
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    setErrors({});
    setState(FORM_STATE.LOADING);

    try {
      const payload = new URLSearchParams();
      payload.set("form-name", "contact");
      payload.set("name", data.name);
      payload.set("email", data.email);
      payload.set("message", data.message);

      await new Promise((r) => setTimeout(r, 3000));
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString(),
      });

      if (!res.ok) throw new Error("Netlify form submission failed");

      setState(FORM_STATE.SUCCESS);
    } catch {
      setState(FORM_STATE.ERROR);
    }
  }

  return (
    <FormContext.Provider
      value={{ state, errors, clearFieldError, resetForm, submitForm }}
    >
      <div className={className} style={{ position: "relative" }}>
        {children}
      </div>
    </FormContext.Provider>
  );
}
