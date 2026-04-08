import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface TimelineAnimatorProps {
  children: ReactNode;
  items: Array<{ id: string }>;
  staggerDelay?: number;
}

export default function TimelineAnimator({
  children,
  items,
  staggerDelay = 0.1,
}: TimelineAnimatorProps) {
  const shouldReduceMotion = useReducedMotion();
  const childArray = React.Children.toArray(children);

  return (
    <>
      {childArray.map((child, index) => (
        <motion.div
          key={items[index]?.id || index}
          initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
          transition={shouldReduceMotion ? {} : {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            delay: index * staggerDelay,
          }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {child}
        </motion.div>
      ))}
    </>
  );
}
