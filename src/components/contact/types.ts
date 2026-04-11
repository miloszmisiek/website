import type { FormEvent } from "react";

export const FORM_STATE = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
} as const;

export type FormState = (typeof FORM_STATE)[keyof typeof FORM_STATE];
export type ContactFieldName = "name" | "email" | "message";
export type FieldErrors = Partial<Record<ContactFieldName, string>>;

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const inputBase =
  "w-full bg-transparent border-b border-foreground/20 px-0 py-3 text-base font-sans text-foreground " +
  "placeholder:text-foreground/40 " +
  "transition-[border-color] duration-200 " +
  "focus-visible:outline-none focus-visible:border-foreground/50 " +
  "hover:border-foreground/30 " +
  "disabled:opacity-40 disabled:cursor-not-allowed";

export type FormContextValue = {
  state: FormState;
  errors: FieldErrors;
  clearFieldError: (field: ContactFieldName) => void;
  resetForm: () => void;
  submitForm: (e: FormEvent<HTMLFormElement>) => Promise<void>;
};

export type FieldContextValue = {
  id: string;
  name: ContactFieldName;
};
