import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrayTitle } from "./ArrayTitle";
import { EASE_SMOOTH } from "../../styles/animations";

type Props = {
  text: string;
};

const reducedMotionFade = (isInView: boolean) => ({
  initial: { opacity: 0 },
  animate: { opacity: isInView ? 1 : 0 },
  transition: { duration: 0.4 },
});

const bracketExpand = (isInView: boolean) => ({
  initial: { width: 0 },
  animate: { width: isInView ? "auto" : 0 },
  transition: { duration: 0.55, ease: EASE_SMOOTH },
});

const textReveal = (isInView: boolean) => ({
  initial: { opacity: 0 },
  animate: { opacity: isInView ? 1 : 0 },
  transition: { duration: 0.25, delay: 0.45, ease: "easeOut" as const },
});

export function AnimatedSectionTitle({ text }: Props) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(headingRef, { once: true, margin: "0px" });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <h2 ref={headingRef} className="section-title">
        <motion.span {...reducedMotionFade(isInView)}>
          <ArrayTitle text={text} />
        </motion.span>
      </h2>
    );
  }

  return (
    <h2
      ref={headingRef}
      className="section-title inline-flex items-baseline gap-2"
    >
      <span aria-hidden="true">[</span>

      <motion.span
        {...bracketExpand(isInView)}
        className="inline-block overflow-hidden whitespace-nowrap align-bottom"
      >
        <motion.span {...textReveal(isInView)} className="inline-block">
          {text}
        </motion.span>
      </motion.span>

      <span aria-hidden="true">]</span>
    </h2>
  );
}
