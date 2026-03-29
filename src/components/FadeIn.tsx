import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface FadeInProps {
	children: ReactNode;
	delay?: number;
	className?: string;
	/**
	 * When true the fade-in is held until the 'typewriter:complete' DOM event
	 * fires instead of starting on mount.  This removes the need for a
	 * hardcoded delay that must be kept in sync with the typewriter duration.
	 */
	waitForTypewriter?: boolean;
}

export const FadeIn = ({
	children,
	delay = 0,
	className = "",
	waitForTypewriter = false,
}: FadeInProps) => {
	const shouldReduceMotion = useReducedMotion() ?? false;
	// Start triggered immediately unless we are waiting for the typewriter
	const [triggered, setTriggered] = useState(!waitForTypewriter);

	useEffect(() => {
		if (!waitForTypewriter) return;
		const handler = () => setTriggered(true);
		window.addEventListener('typewriter:complete', handler, { once: true });
		return () => window.removeEventListener('typewriter:complete', handler);
	}, [waitForTypewriter]);

	// Skip all animation for users who prefer reduced motion
	if (shouldReduceMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={triggered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
			transition={{
				duration: 0.8,
				ease: [0.16, 1, 0.3, 1],
				delay: triggered ? delay : 0,
			}}
			className={className}
		>
			{children}
		</motion.div>
	);
};
