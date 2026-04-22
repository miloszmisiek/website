// GOOD
import { useRef } from "react";
import { useScroll } from "framer-motion";
import { ProductCard } from "./Card";
import { SCALE_STEP } from "./constants";
import type { ProductsListProps } from "./types";

export function ProductsParallaxDesktop({ products }: ProductsListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 96px", "end 96px"],
  });

  return (
    <div ref={containerRef} className="relative mt-8 mlg:mt-16 mlg:pb-[16vh]">
      {products.map((product, index) => {
        const isLast = index === products.length - 1;
        const targetScale = isLast
          ? 1
          : 1 - (products.length - index) * SCALE_STEP;

        return (
          <ProductCard
            key={product.id}
            index={index}
            product={product}
            progress={scrollYProgress}
            total={products.length}
            targetScale={targetScale}
          />
        );
      })}
    </div>
  );
}
