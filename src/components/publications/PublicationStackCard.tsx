import type { Publication } from '../../data/schema';
import { useTranslations, type Locale } from '../../i18n';

interface PublicationStackCardProps {
  publication: Publication;
  lang: Locale;
  isTop: boolean;
  onClick: () => void;
}

const STATUS_COLORS: Record<Publication['status'], { text: string; bg: string }> = {
  Published: { text: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  'Under Review': { text: 'text-amber-500', bg: 'bg-amber-500/10' },
  Preprint: { text: 'text-blue-500', bg: 'bg-blue-500/10' },
};

export function PublicationStackCard({
  publication,
  lang,
  isTop,
  onClick,
}: PublicationStackCardProps) {
  const t = useTranslations(lang);
  const excerpt =
    (lang === 'pl' ? publication.excerpt_pl : publication.excerpt) ?? publication.excerpt;
  const readTime =
    (lang === 'pl' ? publication.readTime_pl : publication.readTime) ?? publication.readTime;
  const status = STATUS_COLORS[publication.status];
  const statusLabel = t(
    `publication.status.${publication.status}` as Parameters<typeof t>[0]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isTop && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      onClick={isTop ? undefined : onClick}
      onKeyDown={handleKeyDown}
      role={isTop ? undefined : 'button'}
      tabIndex={isTop ? undefined : 0}
      aria-label={isTop ? undefined : `Bring to front: ${publication.title}`}
      className={[
        'card-base bg-background overflow-hidden p-6 w-full relative',
        !isTop ? 'group cursor-pointer hover:border-border/80' : '',
      ].join(' ')}
    >
      {/* Visual overlay — replicates bg-white/[0.03] look while keeping base opaque for stacking */}
      <div
        className={[
          'absolute inset-0 pointer-events-none transition-smooth bg-white/[0.03]',
          !isTop ? 'group-hover:bg-white/5' : '',
        ].join(' ')}
        aria-hidden="true"
      />
      {/* Right-edge depth shadow — active card only, reinforces 3D elevation */}
      {isTop && (
        <div
          className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black/20 to-transparent pointer-events-none"
          aria-hidden="true"
        />
      )}
      {/* Status + Year */}
      <div className="flex items-center justify-between mb-4">
        <span
          className={`text-xs font-mono uppercase px-2 py-1 rounded ${status.bg} ${status.text}`}
        >
          {statusLabel}
        </span>
        {publication.year && (
          <span className="text-label">{publication.year}</span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-heading-md mb-2 leading-snug">{publication.title}</h3>

      {/* Authors */}
      {publication.authors.length > 0 && (
        <p className="text-sm italic text-muted mb-3">
          {publication.authors.join(', ')}
        </p>
      )}

      {/* Topics */}
      {publication.topics.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {publication.topics.map((topic) => (
            <span key={topic} className="text-label">
              {topic}
            </span>
          ))}
        </div>
      )}

      {/* Excerpt */}
      {excerpt && (
        <p className="text-body mb-4 line-clamp-3">{excerpt}</p>
      )}

      {/* Meta row */}
      <div className="text-label mb-4 flex flex-wrap gap-3">
        {readTime && <span>{readTime}</span>}
        {readTime && publication.year && <span className="text-muted">·</span>}
        {publication.year && <span>{publication.year}</span>}
        {publication.doi && (
          <>
            <span className="text-muted">·</span>
            <span className="font-mono text-xs">{publication.doi}</span>
          </>
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
          {`[ ${t('publication.viewPaper')} ]`}
        </a>
      )}
    </div>
  );
}
