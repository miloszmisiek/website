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
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <button
            onClick={expand}
            className="appearance-none p-0 m-0 bg-transparent border-0 cursor-pointer focus-ring rounded-none"
            aria-label={`Show ${overflowCount} more technologies`}
          >
            <Badge
              variant="neutral"
              className="border-dashed bg-foreground/5 hover:bg-foreground/10 hover:border-foreground/30 transition-colors"
            >
              + {overflowCount}
            </Badge>
          </button>
        </motion.div>
      )}
    </div>
  );
}
