// GOOD
import { getTranslations } from "../../../../i18n";

export function ImagePlaceholder() {
  const t = getTranslations();
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-foreground/[0.04] font-mono text-xs text-muted tracking-widest border-l border-border/30">
      <div className="flex flex-col items-center gap-4 opacity-50">
        <span className="animate-pulse">_</span>
        {`[ ${t("product.imagePlaceholder")} ]`}
      </div>
    </div>
  );
}
