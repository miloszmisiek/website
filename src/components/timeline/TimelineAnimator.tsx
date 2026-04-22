// GOOD
import React, { type ReactNode } from "react";
import { motion, MotionConfig } from "framer-motion";
import { type TimelineEntry } from "../../data/schema";

type TimelineAnimatorProps = {
  children: ReactNode;
  items: TimelineEntry[];
};

const ANIMATION_CONFIG = {
  initial: { opacity: 0, x: -20 },
  whileInView: { opacity: 1, x: 0 },
  transition: {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1],
    delay: 0.12,
  },
} as const;

export default function TimelineAnimator({
  children,
  items,
}: TimelineAnimatorProps) {
  const childArray = React.Children.toArray(children);

  return (
    <MotionConfig reducedMotion="user">
      <>
        {childArray.map((child, index) => (
          <motion.div
            key={items[index]?.id || `timeline-entry-${index}`}
            viewport={{ once: true, margin: "-100px" }}
            {...ANIMATION_CONFIG}
          >
            {child}
          </motion.div>
        ))}
      </>
    </MotionConfig>
  );
}
