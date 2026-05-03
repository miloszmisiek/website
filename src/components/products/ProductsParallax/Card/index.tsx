import {
  motion,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { cn } from "../../../../styles/cn";
import { Z_CLASSES } from "../constants";
import { CardContent } from "./Content";
import { CardImage } from "./Image";
import type { Product } from "../../../../data/schema";
import { EASE_SMOOTH } from "../../../../styles/animations";

const CARD_ENTER_ANIMATION = {
  initial: { opacity: 1, y: 80 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE_SMOOTH },
  viewport: { once: true, margin: "-60px" },
};

type ProductCardProps = {
  product: Product;
  index: number;
  progress: MotionValue<number>;
  total: number;
  targetScale: number;
};

export function ProductCard({
  product,
  index,
  progress,
  total,
  targetScale,
}: ProductCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  const isLast = index === total - 1;
  const opacity = useTransform(progress, [0, 1], [1, 1]);

  return (
    <div
      className={cn(
        "mlg:sticky mlg:top-24 short:mlg:top-20 flex items-center justify-center",
        "mlg:[&:not(:last-child)]:mb-[16vh]",
        Z_CLASSES[index],
      )}
    >
      <motion.article
        style={!prefersReducedMotion && { scale }}
        {...(index === 0 && CARD_ENTER_ANIMATION)}
        className="w-full origin-top"
      >
        <motion.div
          style={!prefersReducedMotion && { opacity }}
          className="w-full h-full"
        >
          <div className="card-base overflow-hidden flex flex-col-reverse lg:flex-row lg:min-h-[36rem] short:lg:min-h-[28rem] short:max-w-5xl short:mx-auto border border-border/60 shadow-xl group bg-card-bg">
            <CardContent product={product} index={index} />
            <CardImage product={product} />
          </div>
        </motion.div>
      </motion.article>
    </div>
  );
}
