import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  /**
   * When true the fade-in triggers when the element scrolls into the
   * viewport instead of on mount.  Use this for section content so it
   * stays on the same clock as AnimatedSectionTitle (which also uses
   G
   */
  scrollTriggered?: boolean;
  /**
   * When true only opacity is animated — no Y translation.  Use this when
   * the child uses position:sticky or scroll-driven layout (e.g. parallax)
   * where a translateY on a parent would break the sticky containing block.
   */
  noTranslate?: boolean;
}

export const FadeIn = ({
  children,
  delay = 0,
  className = "",
  scrollTriggered = false,
  noTranslate = false,
}: FadeInProps) => {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);

  // scroll-triggered path: useInView fires once when element enters viewport
  const isInView = useInView(ref, { once: true, margin: "-5% 0px" });

  const isVisible = scrollTriggered ? isInView : true;

  // Skip all animation for users who prefer reduced motion
  if (shouldReduceMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  const hiddenState = noTranslate ? { opacity: 0 } : { opacity: 0, y: 10 };
  const visibleState = noTranslate ? { opacity: 1 } : { opacity: 1, y: 0 };

  return (
    <motion.div
      ref={ref}
      initial={hiddenState}
      animate={isVisible ? visibleState : hiddenState}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: isVisible ? delay : 0,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
