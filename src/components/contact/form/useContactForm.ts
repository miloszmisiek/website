import { useState, useEffect } from "react";
import { FORM_STATE, EMAIL_REGEX } from "../constants";
import { getTranslations } from "../../../i18n";
import type { FormState, ContactFieldName, FieldErrors } from "../types";

const { IDLE, LOADING, SUCCESS, ERROR } = FORM_STATE;

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
};

export function useContactForm() {
  const [state, setState] = useState<FormState>(IDLE);
  const [isTyping, setIsTyping] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const handleInput = (e: Event) => {
    const form = e.currentTarget as HTMLFormElement;
    const fd = new FormData(form);
    const hasValue = !!(
      String(fd.get("name") || "").trim() ||
      String(fd.get("email") || "").trim() ||
      String(fd.get("message") || "").trim()
    );
    setIsTyping(hasValue);
  };

  useEffect(() => {
    const form = document.forms.namedItem("contact");
    if (form) {
      form.addEventListener("input", handleInput);
      return () => form.removeEventListener("input", handleInput);
    }
  }, []);

  const clearFieldError = (field: ContactFieldName) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      return { ...prev, [field]: undefined };
    });
  };

  const resetForm = () => {
    setErrors({});
    setState(IDLE);
    setIsTyping(false);
  };

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
      payload.set("bot-field", "");

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
  };

  return { state, isTyping, errors, clearFieldError, resetForm, submitForm };
}
