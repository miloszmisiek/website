// GOOD
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "../Badge";
import { getEntryDelay } from "./utils/getEntryDelay";

type TimelineTechStackProps = {
  technologies: string[];
  maxTech?: number;
};

export function TimelineTechStack({
  technologies,
  maxTech = 4,
}: TimelineTechStackProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (technologies.length === 0) return null;

  const visibleTech = isExpanded
    ? technologies
    : technologies.slice(0, maxTech);
  const overflowCount = technologies.length - maxTech;

  const expand = () => setIsExpanded(true);

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
              delay: getEntryDelay(index, isExpanded, maxTech),
            }}
          >
            <Badge variant="neutral">{tech}</Badge>
          </motion.div>
        ))}
      </AnimatePresence>

      {overflowCount > 0 && !isExpanded && (
        <button
          onClick={expand}
          className="bg-foreground/5 cursor-pointer hover:bg-foreground/10 hover:border-foreground/30 transition-colors focus-ring text-nano px-1.5 py-0.5 rounded-none border border-dashed border-line text-muted font-mono-system tracking-widest"
          aria-label={`Show ${overflowCount} more technologies`}
        >
          + {overflowCount}
        </button>
      )}
    </div>
  );
}
