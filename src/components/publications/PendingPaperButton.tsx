import { Button } from "../button/Button";
import { getTranslations } from "../../i18n";
import { cn } from "../../styles/cn";

type PendingPaperButtonProps = {
  className?: string;
};

// aria-disabled rather than disabled: keeps the control focusable so keyboard
// users can reach it and hear why the paper isn't linked yet.
export function PendingPaperButton({ className }: PendingPaperButtonProps) {
  const t = getTranslations();
  const reason = t("publication.viewPaper.pending");

  const preventActivation = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <span className={cn("group relative inline-flex shrink-0", className)}>
      <Button
        variant="secondary"
        aria-disabled="true"
        aria-describedby="paper-pending-reason"
        className="w-full opacity-50 cursor-not-allowed"
        onClick={preventActivation}
      >
        {t("publication.viewPaper")}
      </Button>
      <span
        id="paper-pending-reason"
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-max max-w-[240px] -translate-x-1/2 border border-border bg-card-bg px-3 py-2 text-caption font-mono leading-relaxed text-foreground/80 opacity-0 shadow-lg group-hover:opacity-100 group-focus-within:opacity-100"
      >
        {reason}
      </span>
    </span>
  );
}
