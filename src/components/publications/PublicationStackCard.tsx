import type { Publication } from "../../data/schema";
import { PublicationStatusEnum } from "../../data/types";
import { getTranslations, type TranslationKey } from "../../i18n";
import { cn } from "../../styles/cn";
import { Badge } from "../Badge";
import { Button } from "../button/Button";
import { PublicationAbstractDialog } from "./PublicationAbstractDialog";

type PublicationStackCardProps = {
  publication: Publication;
  isTop: boolean;
  onClick: () => void;
};

const statusLabels = {
  [PublicationStatusEnum.Published]: "publication.status.published",
  [PublicationStatusEnum.UnderReview]: "publication.status.underreview",
  [PublicationStatusEnum.Preprint]: "publication.status.preprint",
} satisfies Record<PublicationStatusEnum, TranslationKey>;

export function PublicationStackCard({
  publication: {
    excerpt,
    status,
    title,
    authors,
    topics,
    year,
    readTime,
    doi,
    link,
  },
  isTop,
  onClick,
}: PublicationStackCardProps) {
  const t = getTranslations();
  const statusLabel = t(statusLabels[status as keyof typeof statusLabels]);

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isTop || (e.key !== "Enter" && e.key !== " ")) return;
    e.preventDefault();
    onClick();
  };

  return (
    <PublicationAbstractDialog>
      <div
        onClick={isTop ? undefined : onClick}
        onKeyDown={onKeyDown}
        role={isTop ? undefined : "button"}
        tabIndex={isTop ? undefined : 0}
        aria-label={isTop ? undefined : `Bring to front: ${title}`}
        className={cn(
          "card-interactive p-8 lg:p-10 w-full relative",
          !isTop &&
            "card-hoverable group cursor-pointer hover:border-border/80 focus-ring",
        )}
      >
        <div className="hover-gradient-bg absolute inset-0 transition-opacity duration-700 opacity-0 group-hover:opacity-100 rounded-none pointer-events-none"></div>

        {/* Right-edge depth shadow — active card only, reinforces 3D elevation */}
        {isTop && (
          <div
            className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background/60 to-transparent pointer-events-none rounded-none"
            aria-hidden="true"
          />
        )}

        {/* Top Bar */}
        <div className="flex flex-wrap items-center justify-between mb-8 gap-4 border-b border-border/70 pb-6 relative z-10">
          <div className="flex items-center gap-3">
            <Badge
              variant={
                status === "published"
                  ? "success"
                  : status === "underreview"
                    ? "warning"
                    : "info"
              }
            >
              {statusLabel}
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            {year && (
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted/90">
                {year}
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <div className="mb-8 relative z-10">
          <h3 className="text-heading-md mb-4 text-foreground">{title}</h3>

          {/* Authors */}
          {authors.length > 0 && (
            <p className="font-mono text-xs uppercase tracking-widest flex items-center gap-3">
              <span className="text-foreground/40">{"{ author(s): "}</span>
              <span className="text-foreground/80 tracking-wide">
                {authors.join(", ")}
              </span>
              <span className="text-foreground/40">{" }"}</span>
            </p>
          )}
        </div>

        {/* Topics */}
        {topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8 relative z-10">
            {topics.map((topic) => (
              <Badge key={topic} variant="neutral" className="tracking-[0.1em]">
                {topic}
              </Badge>
            ))}
          </div>
        )}

        {/* Excerpt — already normalized to correct locale by PublicationsSection.astro */}
        {excerpt && (
          <p className="text-body mb-10 text-muted/80 relative z-10 pl-4 border-l-2 border-border/70">
            {excerpt.length > 180
              ? `${excerpt.substring(0, 180).trim()}... `
              : `${excerpt} `}
            <PublicationAbstractDialog.Trigger />
          </p>
        )}

        {/* Footer & Meta Information */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-border/70 mt-auto relative z-10">
          <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-muted/90">
            {readTime && (
              <span className="flex items-center gap-2">
                <span className="text-foreground/60">
                  {t("publication.time")}:
                </span>{" "}
                {readTime}
              </span>
            )}
            {doi && (
              <span className="flex items-center gap-2 border-l border-border/70 pl-4">
                <span className="text-foreground/60">doi:</span> {doi}
              </span>
            )}
          </div>

          {/* CTA */}
          {link && (
            <Button
              href={link}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(!isTop && "pointer-events-none")}
              onClick={stopPropagation}
            >
              {t("publication.viewPaper")}
            </Button>
          )}
        </div>
      </div>

      <PublicationAbstractDialog.Panel>
        <PublicationAbstractDialog.Header />
        <PublicationAbstractDialog.Body
          title={title}
          authors={authors}
          excerpt={excerpt}
        />
        <PublicationAbstractDialog.Footer year={year} doi={doi} link={link} />
      </PublicationAbstractDialog.Panel>
    </PublicationAbstractDialog>
  );
}
