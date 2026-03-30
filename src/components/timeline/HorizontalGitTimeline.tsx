import { motion } from 'framer-motion';
import type { TimelineEntry } from '../../data/schema';

interface Props {
  entries: TimelineEntry[];
  presentLabel: string;
}

const MAX_TECH = 4;

// CSS variable shorthands — must match theme.css
const C = {
  bg:         'var(--color-background)',
  fg:         'var(--color-foreground)',
  muted:      'var(--color-muted)',
  border:     'var(--color-border)',
  info:       'var(--color-info)',
  success:    'var(--color-success)',
} as const;

const mono = "ui-monospace, 'Cascadia Code', 'Source Code Pro', monospace";

// ─── Sub-components ──────────────────────────────────────────────────────────

function CommitNode({ isWork }: { isWork: boolean }) {
  const accent = isWork ? C.info : C.success;
  return (
    <div
      style={{
        flexShrink: 0,
        width: 14,
        height: 14,
        borderRadius: '50%',
        border: `2px solid ${accent}`,
        boxShadow: `0 0 0 3px color-mix(in srgb, ${accent}, transparent 82%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: C.bg,
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div
        style={{
          width: 5,
          height: 5,
          borderRadius: '50%',
          backgroundColor: accent,
        }}
      />
    </div>
  );
}

function Connector() {
  return (
    <div
      style={{
        flexShrink: 0,
        width: 1,
        height: 32,
        backgroundImage: `repeating-linear-gradient(
          to bottom,
          ${C.border} 0px,
          ${C.border} 4px,
          transparent 4px,
          transparent 8px
        )`,
      }}
    />
  );
}

function EntryCard({
  entry,
  index,
  presentLabel,
}: {
  entry: TimelineEntry;
  index: number;
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

  const visibleTech   = entry.technologies?.slice(0, MAX_TECH) ?? [];
  const overflowCount = (entry.technologies?.length ?? 0) - MAX_TECH;

  const startYear = entry.period.start.split('-')[0];
  const endYear   = entry.period.end === 'present'
    ? presentLabel
    : entry.period.end.split('-')[0];

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem',
        padding: '0.875rem 1rem',
        border: `1px solid ${C.border}`,
        borderRadius: 6,
        backgroundColor: `color-mix(in srgb, ${C.bg}, transparent 20%)`,
        minWidth: 0,
        overflow: 'hidden',
        transition: 'border-color 0.2s ease, background-color 0.2s ease',
      }}
    >
      {/* Git ref row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontFamily: mono, fontSize: '0.62rem', color: C.muted }}>
        <span style={{ color: accent, opacity: 0.85, letterSpacing: '0.04em' }}>{shortHash}</span>
        <span style={{ opacity: 0.25 }}>─</span>
        <span style={{ opacity: 0.65 }}>{branchName}</span>
        {index === 0 && (
          <span style={{
            fontSize: '0.52rem',
            padding: '1px 4px',
            borderRadius: 3,
            backgroundColor: `color-mix(in srgb, ${C.info}, transparent 82%)`,
            color: C.info,
            border: `1px solid color-mix(in srgb, ${C.info}, transparent 60%)`,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>
            HEAD
          </span>
        )}
      </div>

      {/* Period */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', fontFamily: mono, fontSize: '0.68rem', color: C.muted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        <span>{startYear} – {endYear}</span>
        {entry.duration && <span style={{ opacity: 0.55, fontSize: '0.62rem' }}>{entry.duration}</span>}
      </div>

      {/* Role */}
      <h3 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 500, color: C.fg, lineHeight: 1.3 }}>
        {entry.role}
      </h3>

      {/* Company */}
      <p style={{ margin: 0, fontSize: '0.78rem', fontStyle: 'italic', color: C.muted }}>
        {entry.company}
      </p>

      {/* Focus */}
      {entry.focus && (
        <p style={{ margin: 0, fontFamily: mono, fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: C.muted, opacity: 0.6 }}>
          {entry.focus}
        </p>
      )}

      {/* Highlights */}
      {entry.highlights?.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.22rem' }}>
          {entry.highlights.map((h, i) => (
            <li key={i} style={{ display: 'flex', gap: '0.35rem', fontSize: '0.75rem', color: `color-mix(in srgb, ${C.fg}, transparent 15%)`, lineHeight: 1.45 }}>
              <span style={{ flexShrink: 0, color: C.muted, fontSize: '0.55rem', marginTop: '0.25rem' }}>▸</span>
              {h}
            </li>
          ))}
        </ul>
      )}

      {/* Technologies */}
      {visibleTech.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', fontFamily: mono, fontSize: '0.68rem', color: C.muted, marginTop: 'auto', paddingTop: '0.25rem' }}>
          {visibleTech.map((tech, i) => (
            <span key={tech} style={{ whiteSpace: 'nowrap' }}>
              {tech}
              {i < visibleTech.length - 1 && <span style={{ opacity: 0.35 }}> · </span>}
            </span>
          ))}
          {overflowCount > 0 && (
            <span style={{
              fontSize: '0.58rem',
              padding: '1px 5px',
              borderRadius: 3,
              border: `1px solid ${C.border}`,
              color: C.muted,
              marginLeft: '0.3rem',
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

export default function HorizontalGitTimeline({ entries, presentLabel }: Props) {
  return (
    <div style={{ position: 'relative', minHeight: 680 }}>

      {/* Horizontal dashed trunk */}
      <div style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: '50%',
        height: 1,
        transform: 'translateY(-50%)',
        backgroundImage: `repeating-linear-gradient(
          to right,
          ${C.border} 0px,
          ${C.border} 8px,
          transparent 8px,
          transparent 16px
        )`,
        zIndex: 1,
      }}>
        {/* * main label */}
        <span style={{
          position: 'absolute',
          left: 0,
          top: -20,
          fontFamily: mono,
          fontSize: '0.62rem',
          color: C.muted,
          opacity: 0.45,
          letterSpacing: '0.05em',
          whiteSpace: 'nowrap',
        }}>
          * main
        </span>
      </div>

      {/* Entry columns */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'stretch' }}>
        {entries.map((entry, index) => {
          const isAbove = index % 2 === 0;
          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: isAbove ? -28 : 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
              viewport={{ once: true, margin: '-80px' }}
              style={{
                flex: 1,
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '0 0.5rem',
              }}
            >
              {isAbove ? (
                // Card → Connector → Node → Spacer
                <>
                  <EntryCard entry={entry} index={index} presentLabel={presentLabel} />
                  <Connector />
                  <CommitNode isWork={entry.type === 'work'} />
                  <div style={{ flex: 1 }} />
                </>
              ) : (
                // Spacer → Node → Connector → Card
                <>
                  <div style={{ flex: 1 }} />
                  <CommitNode isWork={entry.type === 'work'} />
                  <Connector />
                  <EntryCard entry={entry} index={index} presentLabel={presentLabel} />
                </>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
