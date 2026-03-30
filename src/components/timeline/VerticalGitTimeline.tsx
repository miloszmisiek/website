import { motion } from 'framer-motion';
import type { TimelineEntry } from '../../data/schema';

interface Props {
  entries: TimelineEntry[];
  presentLabel: string;
}

const MAX_TECH       = 4;
const MAX_HIGHLIGHTS = 3;

const C = {
  bg:      'var(--color-background)',
  fg:      'var(--color-foreground)',
  muted:   'var(--color-muted)',
  border:  'var(--color-border)',
  info:    'var(--color-info)',
  success: 'var(--color-success)',
} as const;

const mono = "ui-monospace, 'Cascadia Code', 'Source Code Pro', monospace";

// ─── HeadBadge ───────────────────────────────────────────────────────────────

function HeadBadge() {
  return (
    <span style={{
      fontSize: '0.5rem',
      padding: '1px 5px',
      borderRadius: 3,
      backgroundColor: `color-mix(in srgb, ${C.info}, transparent 82%)`,
      color: C.info,
      border: `1px solid color-mix(in srgb, ${C.info}, transparent 58%)`,
      letterSpacing: '0.08em',
      textTransform: 'uppercase' as const,
      fontFamily: mono,
    }}>
      HEAD
    </span>
  );
}

// ─── CommitNode ──────────────────────────────────────────────────────────────

function CommitNode({ isWork }: { isWork: boolean }) {
  const accent = isWork ? C.info : C.success;
  return (
    <div style={{
      width: 13,
      height: 13,
      borderRadius: '50%',
      border: `2px solid ${accent}`,
      boxShadow: `0 0 0 3px color-mix(in srgb, ${accent}, transparent 85%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: C.bg,
    }}>
      <div style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: accent }} />
    </div>
  );
}

// ─── EntryCard ───────────────────────────────────────────────────────────────

function EntryCard({
  entry,
  isLeft,
  isFirst,
  presentLabel,
}: {
  entry: TimelineEntry;
  isLeft: boolean;
  isFirst: boolean;
  presentLabel: string;
}) {
  const isWork     = entry.type === 'work';
  const accent     = isWork ? C.info : C.success;
  const branchSlug = entry.company
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const branchName = `${isWork ? 'feat' : 'edu'}/${branchSlug}`;
  const shortHash  = entry.id.replace(/[^a-z0-9]/g, '').slice(0, 7).padEnd(7, '0');

  const visibleTech        = entry.technologies?.slice(0, MAX_TECH) ?? [];
  const overflowCount      = (entry.technologies?.length ?? 0) - MAX_TECH;
  const visibleHighlights  = entry.highlights?.slice(0, MAX_HIGHLIGHTS) ?? [];

  const startYear = entry.period.start.split('-')[0];
  const endYear   = entry.period.end === 'present'
    ? presentLabel
    : entry.period.end.split('-')[0];

  // Shared row direction — left cards mirror horizontally
  const rowDir  = isLeft ? 'row-reverse' as const : 'row' as const;
  const justEnd = isLeft ? 'flex-end'  as const : 'flex-start' as const;
  const textAlign = isLeft ? 'right' as const : 'left' as const;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', textAlign }}>

      {/* Git ref row */}
      <div style={{
        display: 'flex',
        flexDirection: rowDir,
        alignItems: 'center',
        gap: '0.3rem',
        fontFamily: mono,
        fontSize: '0.62rem',
        color: C.muted,
        justifyContent: justEnd,
      }}>
        <span style={{ color: accent, opacity: 0.85, letterSpacing: '0.04em' }}>{shortHash}</span>
        <span style={{ opacity: 0.25 }}>─</span>
        <span style={{ opacity: 0.65 }}>{branchName}</span>
        {isFirst && <HeadBadge />}
      </div>

      {/* Period + duration */}
      <div style={{
        display: 'flex',
        flexDirection: rowDir,
        alignItems: 'baseline',
        gap: '0.4rem',
        fontFamily: mono,
        fontSize: '0.68rem',
        color: C.muted,
        textTransform: 'uppercase' as const,
        letterSpacing: '0.05em',
        justifyContent: justEnd,
      }}>
        <span>{startYear} – {endYear}</span>
        {entry.duration && (
          <span style={{ opacity: 0.5, fontSize: '0.62rem' }}>{entry.duration}</span>
        )}
      </div>

      {/* Role */}
      <h3 style={{
        margin: 0,
        fontSize: '0.95rem',
        fontWeight: 500,
        color: C.fg,
        lineHeight: 1.3,
      }}>
        {entry.role}
      </h3>

      {/* Company */}
      <p style={{ margin: 0, fontSize: '0.78rem', fontStyle: 'italic', color: C.muted }}>
        {entry.company}
      </p>

      {/* Highlights (max 3) */}
      {visibleHighlights.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          {visibleHighlights.map((h, i) => (
            <li key={i} style={{
              display: 'flex',
              flexDirection: rowDir,
              alignItems: 'flex-start',
              gap: '0.35rem',
              fontSize: '0.75rem',
              color: `color-mix(in srgb, ${C.fg}, transparent 15%)`,
              lineHeight: 1.45,
            }}>
              <span style={{ flexShrink: 0, color: C.muted, fontSize: '0.55rem', marginTop: '0.25rem' }}>▸</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Technologies */}
      {visibleTech.length > 0 && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap' as const,
          flexDirection: rowDir,
          alignItems: 'center',
          fontFamily: mono,
          fontSize: '0.68rem',
          color: C.muted,
          justifyContent: justEnd,
          marginTop: '0.1rem',
        }}>
          {visibleTech.map((tech, i) => (
            <span key={tech} style={{ whiteSpace: 'nowrap' as const }}>
              {tech}
              {i < visibleTech.length - 1 && (
                <span style={{ opacity: 0.35 }}> · </span>
              )}
            </span>
          ))}
          {overflowCount > 0 && (
            <span style={{
              fontSize: '0.58rem',
              padding: '1px 5px',
              borderRadius: 3,
              border: `1px solid ${C.border}`,
              color: C.muted,
              margin: isLeft ? '0 0.3rem 0 0' : '0 0 0 0.3rem',
              opacity: 0.65,
            }}>
              +{overflowCount}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

// Distance from grid center to card edge (arm length + node radius)
// Node radius = 6.5px; arm length = 20px; total offset = ~27px
const CARD_OFFSET = 27;
const NODE_RADIUS = 6.5;
const ARM_WIDTH   = 20;

export default function VerticalGitTimeline({ entries, presentLabel }: Props) {
  return (
    <div style={{ position: 'relative' }}>

      {/* * main label */}
      <span style={{
        position: 'absolute',
        left: '50%',
        top: -22,
        transform: 'translateX(10px)',
        fontFamily: mono,
        fontSize: '0.62rem',
        color: C.muted,
        opacity: 0.4,
        letterSpacing: '0.05em',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
      }}>
        * main
      </span>

      {/* Dashed vertical trunk */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: 0,
        bottom: 0,
        width: 1,
        transform: 'translateX(-0.5px)',
        backgroundImage: `repeating-linear-gradient(
          to bottom,
          ${C.border} 0px,
          ${C.border} 6px,
          transparent 6px,
          transparent 12px
        )`,
        zIndex: 0,
      }} />

      {/* Entry rows */}
      {entries.map((entry, index) => {
        const isLeft  = index % 2 === 0;
        const isLast  = index === entries.length - 1;

        return (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: index * 0.15,
            }}
            viewport={{ once: true, margin: '-80px' }}
            style={{
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              marginBottom: isLast ? 0 : '3.5rem',
            }}
          >
            {isLeft ? (
              <>
                {/* Card in LEFT column */}
                <div style={{ paddingRight: CARD_OFFSET, zIndex: 1 }}>
                  <EntryCard
                    entry={entry}
                    isLeft={true}
                    isFirst={index === 0}
                    presentLabel={presentLabel}
                  />
                </div>
                {/* Spacer right column */}
                <div />
              </>
            ) : (
              <>
                {/* Spacer left column */}
                <div />
                {/* Card in RIGHT column */}
                <div style={{ paddingLeft: CARD_OFFSET, zIndex: 1 }}>
                  <EntryCard
                    entry={entry}
                    isLeft={false}
                    isFirst={index === 0}
                    presentLabel={presentLabel}
                  />
                </div>
              </>
            )}

            {/* Commit node — always centered on trunk */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: 14,
              transform: 'translateX(-50%)',
              zIndex: 2,
            }}>
              <CommitNode isWork={entry.type === 'work'} />
            </div>

            {/* Branch arm connecting node to card */}
            <div style={{
              position: 'absolute',
              // Left entry arm: from card right edge → node left edge
              // Right entry arm: from node right edge → card left edge
              left: isLeft
                ? `calc(50% - ${NODE_RADIUS + ARM_WIDTH}px)`
                : `calc(50% + ${NODE_RADIUS}px)`,
              top: 20,
              width: ARM_WIDTH,
              height: 1,
              backgroundColor: C.border,
              zIndex: 1,
            }} />
          </motion.div>
        );
      })}
    </div>
  );
}
