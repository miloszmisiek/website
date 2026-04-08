import { motion, useReducedMotion } from "framer-motion";
import { useTypewriter } from "./useTypewriter";

type TerminalTypewriterProps = {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDelay?: number;
  className?: string;
};

export const TerminalTypewriter = ({
  words,
  typingSpeed,
  deletingSpeed,
  pauseDelay,
  className = "",
}: TerminalTypewriterProps) => {
  const shouldReduceMotion = useReducedMotion();
  const text = useTypewriter(words, { typingSpeed, deletingSpeed, pauseDelay });

  return (
    <span className={className}>
      {text}
      <motion.span
        animate={shouldReduceMotion ? {} : { opacity: [1, 0] }}
        transition={shouldReduceMotion ? {} : { duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block w-[0.6em] h-[1em] bg-foreground/60 ml-1 translate-y-[2px]"
      />
    </span>
  );
};
