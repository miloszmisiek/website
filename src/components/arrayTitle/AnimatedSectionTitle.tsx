import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface Props {
  text: string;
  delay?: number;
}

export function AnimatedSectionTitle({ text, delay = 0 }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const prefersReducedMotion = useReducedMotion();

  // Reduced-motion: skip width expansion, just fade in
  if (prefersReducedMotion) {
    return (
      <h2 ref={ref} className="section-title">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay }}
        >
          {`[ ${text} ]`}
        </motion.span>
      </h2>
    );
  }

  return (
    <h2
      ref={ref}
      className="section-title"
      style={{ display: "inline-flex", alignItems: "baseline", gap: "0.35em" }}
    >
      {/* Opening bracket — fixed */}
      <span aria-hidden="true">[</span>

      {/* Expanding slot: width 0 → auto, ] bracket follows rightward */}
      <motion.span
        initial={{ width: 0 }}
        animate={isInView ? { width: "auto" } : { width: 0 }}
        transition={{
          duration: 0.55,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          display: "inline-block",
          overflow: "hidden",
          whiteSpace: "nowrap",
          verticalAlign: "bottom",
        }}
      >
        {/* Text fades in after bracket expansion is mostly done */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: 0.25,
            delay: delay + 0.45,
            ease: "easeOut",
          }}
          style={{ display: "inline-block" }}
        >
          {text}
        </motion.span>
      </motion.span>

      {/* Closing bracket — follows the expanding slot */}
      <span aria-hidden="true">]</span>
    </h2>
  );
}
