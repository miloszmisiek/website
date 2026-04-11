import { AnimatePresence, motion } from "framer-motion";
import { useFormContext } from "../context/FormContext";
import { FORM_STATE } from "../../types";

export function View({ children }: { children: React.ReactNode }) {
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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: -10,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
          }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          onSubmit={submitForm}
          noValidate
        >
          <input type="hidden" name="form-name" value="contact" />
          <p className="hidden">
            <label>
              Do not fill this out if you are human: <input name="bot-field" />
            </label>
          </p>
          {children}
        </motion.form>
      )}
    </AnimatePresence>
  );
}
