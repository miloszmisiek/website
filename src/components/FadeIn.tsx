import { type ReactNode, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { EASE_SMOOTH } from "../styles/animations";

type FadeInOptions = Partial<{
  delay: number;
  scrollTriggered: boolean;
  noTranslate: boolean;
}>;
type FadeInProps = Partial<{
  children: ReactNode;
  className?: string;
}> &
  FadeInOptions;

function makeVariants(noTranslate: boolean) {
  const hidden = { opacity: 0, ...(!noTranslate && { y: 10 }) };
  const visible = { opacity: 1, ...(!noTranslate && { y: 0 }) };
  return { hidden, visible };
}

export function FadeIn({
  children,
  delay = 0,
  className = "",
  scrollTriggered = false,
  noTranslate = false,
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();
  const fadeInRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(fadeInRef, { once: true, margin: "-5% 0px" });
  const isVisible = scrollTriggered ? isInView : true;

  if (shouldReduceMotion) {
    return (
      <div ref={fadeInRef} className={className}>
        {children}
      </div>
    );
  }

  const { hidden, visible } = makeVariants(noTranslate);

  return (
    <motion.div
      ref={fadeInRef}
      initial={hidden}
      animate={isVisible ? visible : hidden}
      transition={{
        duration: 0.8,
        ease: EASE_SMOOTH,
        delay: isVisible ? delay : 0,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
