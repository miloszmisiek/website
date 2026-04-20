// GOOD
import { motion, useReducedMotion } from "framer-motion";
import { useTypewriter } from "./useTypewriter";

type TypewriterOptions = Partial<{
  typingSpeed: number;
  deletingSpeed: number;
  pauseDelay: number;
  disabled: boolean;
}>;

type TerminalTypewriterProps = {
  words: string[];
  className?: string;
} & TypewriterOptions;

export const TerminalTypewriter = ({
  words,
  typingSpeed,
  deletingSpeed,
  pauseDelay,
  className = "",
}: TerminalTypewriterProps) => {
  const shouldReduceMotion = useReducedMotion();
  const typewriterOptions = {
    typingSpeed,
    deletingSpeed,
    pauseDelay,
    disabled: !!shouldReduceMotion,
  };
  const text = useTypewriter(words, typewriterOptions);

  return (
    <span className={className}>
      {text}
      {!shouldReduceMotion && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          className="inline-block w-[0.6em] h-[1em] bg-foreground/60 ml-1 translate-y-0.5"
        />
      )}
    </span>
  );
};
