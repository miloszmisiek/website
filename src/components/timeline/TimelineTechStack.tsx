import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimelineTechStackProps {
  technologies: string[];
  maxTech?: number;
}

export function TimelineTechStack({ technologies, maxTech = 4 }: TimelineTechStackProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!technologies || technologies.length === 0) return null;

  const visibleTech = isExpanded ? technologies : technologies.slice(0, maxTech);
  const overflowCount = technologies.length - maxTech;
  const hasOverflow = overflowCount > 0;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <AnimatePresence>
        {visibleTech.map((tech, i) => (
          <motion.span
            key={tech}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: isExpanded && i >= maxTech ? (i - maxTech) * 0.05 : 0 }}
            className="font-mono text-[10px] tracking-widest text-muted/90 bg-neutral-900/50 border border-neutral-700/65 px-2 py-1 rounded-sm uppercase"
          >
            {tech}
          </motion.span>
        ))}
      </AnimatePresence>
      
      {hasOverflow && !isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="tech-overflow bg-foreground/5 cursor-pointer hover:bg-foreground/10 hover:border-foreground/30 transition-colors focus-ring"
          aria-label={`Show ${overflowCount} more technologies`}
        >
          + {overflowCount}
        </button>
      )}
    </div>
  );
}
