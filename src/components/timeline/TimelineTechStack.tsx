import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "../Badge";

interface TimelineTechStackProps {
  technologies: string[];
  maxTech?: number;
}

export function TimelineTechStack({
  technologies,
  maxTech = 4,
}: TimelineTechStackProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!technologies || technologies.length === 0) return null;

  const visibleTech = isExpanded
    ? technologies
    : technologies.slice(0, maxTech);
  const overflowCount = technologies.length - maxTech;
  const hasOverflow = overflowCount > 0;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <AnimatePresence>
        {visibleTech.map((tech, index) => (
          <motion.div
            key={tech}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.2,
              delay:
                isExpanded && index >= maxTech ? (index - maxTech) * 0.05 : 0,
            }}
          >
            <Badge variant="neutral">{tech}</Badge>
          </motion.div>
        ))}
      </AnimatePresence>

      {hasOverflow && !isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="bg-foreground/5 cursor-pointer hover:bg-foreground/10 hover:border-foreground/30 transition-colors focus-ring text-[0.55rem] px-[6px] py-[2px] rounded-none border border-dashed border-[var(--color-line)] text-[var(--color-muted)] font-mono-system tracking-[0.1em]"
          aria-label={`Show ${overflowCount} more technologies`}
        >
          + {overflowCount}
        </button>
      )}
    </div>
  );
}
