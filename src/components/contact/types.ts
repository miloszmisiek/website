import { FORM_STATE } from "./constants";

export type FormState = (typeof FORM_STATE)[keyof typeof FORM_STATE];
export type ContactFieldName = "name" | "email" | "message";
export type FieldErrors = Partial<Record<ContactFieldName, string>>;

export type FormContextValue = {
  state: FormState;
  isTyping: boolean;
  errors: FieldErrors;
  clearFieldError: (field: ContactFieldName) => void;
  resetForm: () => void;
  submitForm: (e: React.SubmitEvent<HTMLFormElement>) => Promise<void>;
};

export type FieldContextValue = {
  id: string;
  name: ContactFieldName;
};
