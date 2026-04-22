// GOOD
import { AnimatePresence, motion } from "framer-motion";
import { useFormContext } from "../context/FormContext";
import { FORM_STATE } from "../../constants";
import type { PropsWithChildren } from "react";
import { FADE_SLIDE_ANIMATION } from "../animations";

export function View({ children }: PropsWithChildren) {
  const { state, submitForm } = useFormContext();
  return (
    <AnimatePresence initial={false}>
      {state !== FORM_STATE.SUCCESS && (
        <motion.form
          key="form"
          method="post"
          name="contact"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          {...FADE_SLIDE_ANIMATION}
          onSubmit={submitForm}
          noValidate
        >
          <input type="hidden" name="form-name" value="contact" />
          <HoneypotField />
          {children}
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function HoneypotField() {
  return (
    <p className="hidden">
      <label>
        Do not fill this out if you are human: <input name="bot-field" />
      </label>
    </p>
  );
}
