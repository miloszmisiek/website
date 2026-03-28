import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterProps {
	text: string;
	delay?: number;
	className?: string;
}

export const Typewriter = ({ text, delay = 0, className = "" }: TypewriterProps) => {
	const [displayText, setDisplayText] = useState("");
	const [isComplete, setIsComplete] = useState(false);

	useEffect(() => {
		let timeout: NodeJS.Timeout;
		let cursorTimeout: NodeJS.Timeout;
		let currentIndex = 0;

		const startTyping = () => {
			timeout = setInterval(() => {
				setDisplayText(text.slice(0, currentIndex + 1));
				currentIndex++;
				if (currentIndex === text.length) {
					clearInterval(timeout);
					// Hide cursor after typing finishes (1.5 seconds later)
					cursorTimeout = setTimeout(() => {
						setIsComplete(true);
					}, 1500);
				}
			}, 50); // 50ms per character
		};

		const initialDelay = setTimeout(startTyping, delay * 1000);

		return () => {
			clearInterval(timeout);
			clearTimeout(initialDelay);
			clearTimeout(cursorTimeout);
		};
	}, [text, delay]);

	return (
		<h1 className={className}>
			<span className="bg-clip-text text-transparent bg-gradient-to-br from-white to-neutral-500">
				{displayText}
			</span>
			{/* Blinking Cursor that naturally follows inline text */}
			{!isComplete && (
				<motion.span
					animate={{ opacity: [1, 0] }}
					transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
					className="inline-block align-baseline w-[0.4em] h-[0.9em] bg-neutral-400 ml-1 translate-y-[0.1em]"
				/>
			)}
		</h1>
	);
};
