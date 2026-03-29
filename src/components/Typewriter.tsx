import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface TypewriterProps {
	text: string;
	delay?: number;
	className?: string;
}

export const Typewriter = ({ text, delay = 0, className = "" }: TypewriterProps) => {
	const shouldReduceMotion = useReducedMotion() ?? false;
	const [displayText, setDisplayText] = useState(shouldReduceMotion ? text : "");
	const [cursorVisible, setCursorVisible] = useState(!shouldReduceMotion);

	useEffect(() => {
		if (shouldReduceMotion) {
			setDisplayText(text);
			setCursorVisible(false);
			window.dispatchEvent(new CustomEvent('typewriter:complete'));
			return;
		}

		let interval: ReturnType<typeof setInterval>;
		let cursorTimeout: ReturnType<typeof setTimeout>;
		let currentIndex = 0;

		const startTyping = () => {
			interval = setInterval(() => {
				currentIndex++;
				setDisplayText(text.slice(0, currentIndex));
				if (currentIndex === text.length) {
					clearInterval(interval);
					window.dispatchEvent(new CustomEvent('typewriter:complete'));
					// Fade out after exactly 3 blink cycles (3 × 800 ms)
					cursorTimeout = setTimeout(() => setCursorVisible(false), 2400);
				}
			}, 50);
		};

		const initialDelay = setTimeout(startTyping, delay * 1000);

		return () => {
			clearInterval(interval);
			clearTimeout(initialDelay);
			clearTimeout(cursorTimeout);
		};
	}, [text, delay, shouldReduceMotion]);

	const remaining = text.slice(displayText.length);

	return (
		<h1 className={className}>
			{/*
			 * Visible typed portion — gradient applied only to this span so
			 * it spans exactly the revealed text, matching original behaviour.
			 */}
			<span className="bg-clip-text text-transparent bg-gradient-to-br from-white to-neutral-500">
				{displayText}
			</span>

			{/*
			 * Zero-width cursor: the `w-0 overflow-visible` wrapper contributes
			 * 0 px to the inline text flow, so it can never push a word across
			 * a line-break boundary.  The visual block overflows from the
			 * absolutely-positioned child inside the `relative` wrapper.
			 */}
			{!shouldReduceMotion && (
				<motion.span
					aria-hidden="true"
					animate={{ opacity: cursorVisible ? [1, 0] : 0 }}
					transition={
						cursorVisible
							? { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
							: { duration: 0.3, ease: "easeOut" }
					}
					className="relative inline-block w-0  align-baseline"
				>
					<span className="absolute left-1 top-[-0.8em] w-[0.4em] h-[0.9em] bg-neutral-400 inline-block" />
				</motion.span>
			)}

			{/*
			 * Invisible trailing text: keeps the not-yet-typed portion in the
			 * text flow so word-wrap positions are always those of the final
			 * full text.  As `displayText` grows this shrinks, but their sum
			 * is always `text` — layout never changes, zero reflow.
			 */}
			{remaining.length > 0 && (
				<span
					aria-hidden="true"
					style={{ visibility: 'hidden' }}
					className="select-none pointer-events-none"
				>
					{remaining}
				</span>
			)}
		</h1>
	);
};
