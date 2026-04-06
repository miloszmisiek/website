import type { Publication } from "../../data/schema";
import { useTranslations, type Locale } from "../../i18n";

interface PublicationStackCardProps {
  publication: Publication;
  lang: Locale;
  isTop: boolean;
  onClick: () => void;
}

const STATUS_COLORS: Record<
  Publication["status"],
  { text: string; bg: string; border: string }
> = {
  Published: {
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
  },
  "Under Review": {
    text: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
  },
  Preprint: {
    text: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
  },
};

export function PublicationStackCard({
  publication,
  lang,
  isTop,
  onClick,
}: PublicationStackCardProps) {
  const t = useTranslations(lang);
  const excerpt =
    (lang === "pl" ? publication.excerpt_pl : publication.excerpt) ??
    publication.excerpt;
  const readTime =
    (lang === "pl" ? publication.readTime_pl : publication.readTime) ??
    publication.readTime;
  const status = STATUS_COLORS[publication.status];
  const statusLabel = t(
    `publication.status.${publication.status}` as Parameters<typeof t>[0],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isTop && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      onClick={isTop ? undefined : onClick}
      onKeyDown={handleKeyDown}
      role={isTop ? undefined : "button"}
      tabIndex={isTop ? undefined : 0}
      aria-label={isTop ? undefined : `Bring to front: ${publication.title}`}
      className={[
        "card-interactive p-8 lg:p-10 w-full relative",
        !isTop ? "group cursor-pointer hover:border-border/80" : "",
      ].join(" ")}
    >
      <div className="hover-gradient-bg absolute inset-0 transition-opacity duration-700 opacity-0 group-hover:opacity-100 rounded-lg pointer-events-none"></div>

      {/* Right-edge depth shadow — active card only, reinforces 3D elevation */}
      {isTop && (
        <div
          className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black/40 to-transparent pointer-events-none rounded-r-lg"
          aria-hidden="true"
        />
      )}

      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between mb-8 gap-4 border-b border-border/40 pb-6 relative z-10">
        <div className="flex items-center gap-3">
          <span
            className={`text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-sm border ${status.bg} ${status.text} ${status.border}`}
          >
            {statusLabel}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {publication.year && (
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted/60">
              {publication.year}
            </span>
          )}
        </div>
      </div>

      {/* Title */}
      <div className="mb-8 relative z-10">
        <h3 className="text-heading-md mb-4 text-foreground">
          {publication.title}
        </h3>

        {/* Authors */}
        {publication.authors.length > 0 && (
          <p className="font-mono text-xs uppercase tracking-widest text-muted/70 flex items-center gap-3">
            <span className="text-foreground/30">{"{ author(s): "}</span>
            {publication.authors.join(", ")}
            <span className="text-foreground/30">{" }"}</span>
          </p>
        )}
      </div>

      {/* Topics */}
      {publication.topics.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8 relative z-10">
          {publication.topics.map((topic) => (
            <span
              key={topic}
              className="font-mono text-[10px] tracking-[0.1em] text-muted/80 bg-neutral-900/20 border border-neutral-800 px-2 py-1 rounded-sm uppercase"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      {/* Excerpt */}
      {excerpt && (
        <p className="text-body mb-10 line-clamp-3 text-muted/80 relative z-10 pl-4 border-l-2 border-border/30">
          {excerpt}
        </p>
      )}

      {/* Footer & Meta Information */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-border/40 mt-auto relative z-10">
        <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-muted/50">
          {readTime && (
            <span className="flex items-center gap-2">
              <span className="text-foreground/30">time:</span> {readTime}
            </span>
          )}
          {publication.doi && (
            <span className="flex items-center gap-2 border-l border-border/40 pl-4">
              <span className="text-foreground/30">doi:</span> {publication.doi}
            </span>
          )}
        </div>

        {/* CTA */}
        {publication.link && (
          <a
            href={publication.link}
            target="_blank"
            rel="noopener noreferrer"
            className="button-secondary"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-muted/40 mr-2">[</span>
            {t("publication.viewPaper")}
            <span className="text-muted/40 ml-2">]</span>
          </a>
        )}
      </div>
    </div>
  );
}
