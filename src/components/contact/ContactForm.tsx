import { MotionConfig } from "framer-motion";
import { getTranslations } from "../../i18n";
import { IconCheck } from "./icons/IconCheck";
import { Loader } from "./icons/Loader";
import { Form } from "./form";

export function ContactForm() {
  const t = getTranslations();

  return (
    <MotionConfig reducedMotion="user">
    <Form.Root>
      <Form.LiveRegion
        successText={t("contact.form.success")}
        errorText={t("contact.form.error")}
      />

      <Form.SuccessView>
        <div className="border-t border-foreground/10" />
        <div className="pt-10 pb-2 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full border border-emerald-500/30 bg-emerald-500/10 shrink-0">
              <IconCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-sm font-sans text-foreground/80 leading-relaxed">
              {t("contact.form.success")}
            </p>
          </div>
          <Form.ResetButton className="w-fit text-micro font-mono text-muted/80 hover:text-foreground/70 tracking-widest uppercase transition-colors duration-200 cursor-pointer">
            {"[ reset ]"}
          </Form.ResetButton>
        </div>
      </Form.SuccessView>

      <Form.View>
        <Form.Field name="name">
          <Form.Label>{t("contact.form.name.label")}</Form.Label>
          <Form.Input
            type="text"
            autoComplete="name"
            placeholder={t("contact.form.name.placeholder")}
            required
          />
          <Form.FieldError />
        </Form.Field>

        <Form.Field name="email">
          <Form.Label>{t("contact.form.email.label")}</Form.Label>
          <Form.Input
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            placeholder={t("contact.form.email.placeholder")}
            required
          />
          <Form.FieldError />
        </Form.Field>

        <Form.Field name="message">
          <Form.Label>{t("contact.form.message.label")}</Form.Label>
          <Form.Textarea
            rows={5}
            placeholder={t("contact.form.message.placeholder")}
            className="resize-none leading-relaxed"
            required
          />
          <Form.FieldError />
        </Form.Field>

        <Form.ErrorBanner>{t("contact.form.error")}</Form.ErrorBanner>

        <div className="flex items-center justify-between pt-6 pb-1">
          <Form.StatusText />
          <Form.SubmitButton>
            <Form.SubmitIdle>{t("contact.form.submit")}</Form.SubmitIdle>
            <Form.SubmitLoading>
              <Loader className="w-6 h-6" />
            </Form.SubmitLoading>
          </Form.SubmitButton>
        </div>
      </Form.View>
    </Form.Root>
    </MotionConfig>
  );
}
