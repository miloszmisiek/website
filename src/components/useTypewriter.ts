import { useState, useEffect } from "react";

type UseTypewriterOptions = {
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDelay?: number;
};

export function useTypewriter(
  words: string[],
  {
    typingSpeed = 80,
    deletingSpeed = 40,
    pauseDelay = 1500,
  }: UseTypewriterOptions = {},
) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const scheduleTyping = () => {
    const word = words[wordIndex];
    return text === word
      ? setTimeout(() => setIsDeleting(true), pauseDelay)
      : setTimeout(() => setText(word.slice(0, text.length + 1)), typingSpeed);
  };

  const scheduleDeleting = () => {
    if (!text) {
      setIsDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
      return;
    }
    return setTimeout(() => setText(text.slice(0, -1)), deletingSpeed);
  };

  useEffect(() => {
    const t = isDeleting ? scheduleDeleting() : scheduleTyping();
    return () => clearTimeout(t);
  }, [
    isDeleting,
    text,
    wordIndex,
    words,
    typingSpeed,
    deletingSpeed,
    pauseDelay,
  ]);

  return text;
}
