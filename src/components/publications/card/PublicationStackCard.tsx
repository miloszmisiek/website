import type { Publication } from "../../../data/schema";
import { PublicationStatusEnum } from "../../../data/types";
import { getTranslations, type TranslationKey } from "../../../i18n";
import { cn } from "../../../styles/cn";
import { Badge } from "../../Badge";
import { Button } from "../../button/Button";
import { PublicationAbstractDialog } from "../dialog";

type PublicationStackCardProps = {
  publication: Publication;
  isTop: boolean;
  onClick?: () => void;
};

const statusLabels = {
  [PublicationStatusEnum.Published]: "publication.status.published",
  [PublicationStatusEnum.UnderReview]: "publication.status.underreview",
  [PublicationStatusEnum.Preprint]: "publication.status.preprint",
} satisfies Record<PublicationStatusEnum, TranslationKey>;

const STATUS_BADGE_VARIANTS: Record<
  PublicationStatusEnum,
  "success" | "warning" | "info"
> = {
  [PublicationStatusEnum.Published]: "success",
  [PublicationStatusEnum.UnderReview]: "warning",
  [PublicationStatusEnum.Preprint]: "info",
};

export function PublicationStackCard({
  publication,
  isTop,
  onClick,
}: PublicationStackCardProps) {
  const {
    excerpt,
    tldr,
    status,
    title,
    authors,
    topics,
    year,
    readTime,
    doi,
    link,
  } = publication;
  const t = getTranslations();
  const statusLabel = t(statusLabels[status]);
  const statusVariant = STATUS_BADGE_VARIANTS[status];

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isTop || (e.key !== "Enter" && e.key !== " ")) return;
    e.preventDefault();
    onClick?.();
  };

  return (
    <PublicationAbstractDialog.Root publication={publication}>
      <div
        onClick={isTop ? undefined : onClick}
        onKeyDown={onKeyDown}
        role={isTop ? undefined : "button"}
        tabIndex={isTop ? undefined : 0}
        aria-label={isTop ? undefined : title}
        className={cn(
          "card-interactive p-5 sm:p-7 lg:p-10 short:!p-8 w-full relative flex flex-col h-full",
          !isTop &&
            "card-hoverable group cursor-pointer hover:border-border/80 focus-ring",
        )}
      >
        <div className="hover-gradient-bg absolute inset-0 transition-opacity duration-700 opacity-0 group-hover:opacity-100 rounded-none pointer-events-none"></div>

        {isTop && (
          <div
            className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background/60 to-transparent pointer-events-none rounded-none"
            aria-hidden="true"
          />
        )}

        <div className="flex flex-wrap items-center justify-between mb-5 sm:mb-8 short:mb-3 gap-4 border-b border-border/70 pb-6 short:pb-4 relative z-10">
          <div className="flex items-center gap-3">
            <Badge variant={statusVariant}>{statusLabel}</Badge>
          </div>

          <div className="flex items-center gap-3">
            {year && (
              <span className="text-mono-date">{year}</span>
            )}
          </div>
        </div>

        <div className="mb-5 sm:mb-8 short:mb-3 relative z-10">
          <h3 className="text-heading-md text-2xl md:text-3xl short:text-2xl mb-4 short:mb-2">{title}</h3>

          {authors.length > 0 && (
            <p className="text-mono-meta flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="text-foreground/60 whitespace-nowrap">
                authors:
              </span>
              <span className="text-foreground/80 tracking-wide min-w-0">
                {authors.join(", ")}
              </span>
            </p>
          )}
        </div>

        {topics.length > 0 && (
          <div className="hidden sm:flex flex-wrap gap-2 short:gap-1 mb-8 short:mb-4 relative z-10">
            {topics.map((topic) => (
              <Badge key={topic} variant="neutral" className="tracking-widest">
                {topic}
              </Badge>
            ))}
          </div>
        )}

        {(tldr || excerpt) && (
          <p className="text-body text-base md:text-lg short:text-sm mb-6 sm:mb-10 short:mb-5 text-muted/80 relative z-10 pl-4 border-l-2 border-border/70">
            {tldr ? (
              <span>{tldr}</span>
            ) : (
              <span>
                {excerpt && excerpt.length > 180
                  ? `${excerpt.substring(0, 180).trim()}... `
                  : `${excerpt} `}
              </span>
            )}
            {" "}
            <PublicationAbstractDialog.Trigger />
          </p>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 short:gap-3 pt-6 short:pt-4 border-t border-border/70 mt-auto relative z-10">
          <div className="flex items-center gap-x-4 overflow-hidden text-micro font-mono uppercase tracking-widest text-muted/90 min-w-0">
            {readTime && (
              <span className="flex items-center gap-2 shrink-0">
                <span className="text-foreground/60">
                  {t("publication.time")}:
                </span>{" "}
                {readTime}
              </span>
            )}
            {doi && (
              <span className="flex items-center gap-2 sm:border-l sm:border-border/70 sm:pl-4 min-w-0 shrink overflow-hidden">
                <span className="text-foreground/60 shrink-0">doi:</span>
                <span className="truncate">{doi}</span>
              </span>
            )}
          </div>

          {link && (
            <Button
              href={link}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
              className={cn("shrink-0", !isTop && "pointer-events-none")}
              onClick={stopPropagation}
            >
              {t("publication.viewPaper")}
            </Button>
          )}
        </div>
      </div>

      <PublicationAbstractDialog.Panel>
        <PublicationAbstractDialog.Header />
        <PublicationAbstractDialog.Body />
        <PublicationAbstractDialog.Footer />
      </PublicationAbstractDialog.Panel>
    </PublicationAbstractDialog.Root>
  );
}
