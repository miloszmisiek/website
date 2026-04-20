import { getTranslations } from "../../../i18n";
import { Button } from "../../button/Button";

type FooterProps = Partial<{
  year: number;
  doi: string;
  link: string;
}>;

export function Footer({ year, doi, link }: FooterProps) {
  const t = getTranslations();
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-6 sm:px-8 py-5 border-t border-border/70 flex-shrink-0">
      <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-muted/70 min-w-0 overflow-hidden">
        {year && <span className="shrink-0">{year}</span>}
        {doi && (
          <span className="flex items-center gap-2 border-l border-border/70 pl-4 min-w-0 overflow-hidden">
            <span className="text-foreground/40 shrink-0">doi:</span>
            <span className="truncate">{doi}</span>
          </span>
        )}
      </div>
      {link && (
        <Button
          href={link}
          variant="secondary"
          className="w-full md:w-auto shrink-0"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("publication.viewPaper")}
        </Button>
      )}
    </div>
  );
}
