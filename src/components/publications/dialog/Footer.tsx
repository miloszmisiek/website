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
    <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row items-center justify-between px-6 sm:px-8 py-5 border-t border-border/70 flex-shrink-0">
      <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-muted/70">
        {year && <span>{year}</span>}
        {doi && (
          <span className="flex items-center gap-2 border-l border-border/70 pl-4">
            <span className="text-foreground/40">doi:</span> {doi}
          </span>
        )}
      </div>
      {link && (
        <Button
          href={link}
          variant="secondary"
          className="w-full lg:w-auto"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("publication.viewPaper")}
        </Button>
      )}
    </div>
  );
}
