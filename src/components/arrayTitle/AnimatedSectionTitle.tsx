import { motion, useReducedMotion } from "framer-motion";
import { ArrayTitle } from "./ArrayTitle";
import { EASE_SMOOTH } from "../../styles/animations";

type Props = {
  text: string;
};

const reducedMotionFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.4 },
};

const bracketExpand = {
  initial: { width: 0 },
  animate: { width: "auto" },
  transition: { duration: 0.55, ease: EASE_SMOOTH },
};

const textReveal = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.25, delay: 0.45, ease: "easeOut" as const },
};

export function AnimatedSectionTitle({ text }: Props) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <h2 className="section-title">
        <motion.span {...reducedMotionFade}>
          <ArrayTitle text={text} />
        </motion.span>
      </h2>
    );
  }

  return (
    <h2 className="section-title inline-flex items-baseline gap-2">
      <span aria-hidden="true">[</span>

      <motion.span
        {...bracketExpand}
        className="inline-block overflow-hidden whitespace-nowrap align-bottom"
      >
        <motion.span {...textReveal} className="inline-block">
          {text}
        </motion.span>
      </motion.span>

      <span aria-hidden="true">]</span>
    </h2>
  );
}
