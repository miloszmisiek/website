import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FadeInProps {
	children: ReactNode;
	delay?: number;
	className?: string;
}

export const FadeIn = ({ children, delay = 0, className = "" }: FadeInProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
			className={className}
		>
			{children}
		</motion.div>
	);
};
