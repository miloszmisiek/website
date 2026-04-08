import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import type { Product } from "../../data/schema";
import { getTranslations } from "../../i18n";
import { ArrayTitle } from "../arrayTitle/ArrayTitle";

interface ProductsParallaxProps {
  products: Product[];
}

export function ProductsParallax({ products }: ProductsParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of the entire products container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative mt-8 md:mt-16">
      {products.map((product, index) => {
        // Earlier cards scale down more as they get pushed back further
        const targetScale = 1 - (products.length - index) * 0.05;

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

interface ProductCardProps {
  product: Product;
  index: number;
  progress: any;
  total: number;
  targetScale: number;
}

function ProductCard({
  product,
  index,
  progress,
  total,
  targetScale,
}: ProductCardProps) {
  const t = getTranslations();
  const prefersReducedMotion = useReducedMotion();

  // Calculate when this specific card should start its stacking animation.
  // We want it to start scaling down when the NEXT card starts coming up.
  const startRange = index / total;
  const endRange = 1;

  // Parallax transforms applied as the user scrolls past this card
  const scale = useTransform(
    progress,
    [startRange, endRange],
    [1, targetScale],
  );

  return (
    <div
      className="md:sticky md:top-24 flex items-center justify-center"
      style={{
        zIndex: 10 + index,
        marginBottom: index < total - 1 ? "16vh" : 0,
      }}
    >
      <motion.article
        style={prefersReducedMotion ? {} : { scale }}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 80 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: "-60px" }}
        className="w-full origin-top"
      >
        <div className="card-base bg-background overflow-hidden flex flex-col md:flex-row md:min-h-[36rem] border border-border/60 shadow-xl group">
          {/* Left: Content */}
          <div className="flex-1 p-8 lg:p-12 flex flex-col border-b md:border-b-0 md:border-r border-border/50 bg-background/95 backdrop-blur-sm z-10 hover-gradient">
            <div className="hover-gradient-bg" />
            {/* Header: Number & Year */}
            <div className="flex items-center justify-between mb-10">
              <span className="font-mono text-xs tracking-[0.2em] text-muted">
                {String(index).padStart(2, "0")}
              </span>
              {product.year && (
                <span className="font-mono text-[10px] text-muted/90 tracking-[0.3em] uppercase">
                  {product.year}
                </span>
              )}
            </div>

            {/* Title & Role */}
            <div className="mb-8">
              <h3 className="text-heading-lg mb-4 text-foreground">
                {product.name}
              </h3>
              {product.role && (
                <p className="font-mono text-xs text-muted/80 uppercase tracking-[0.2em]">{`// ${product.role}`}</p>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-body text-muted/90 mb-10 grow max-w-xl">
                {product.description}
              </p>
            )}

            {/* Tech stack */}
            {product.technologies && product.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-10">
                {product.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[10px] text-muted/90 tracking-widest bg-neutral-800/40 border border-neutral-700/70 px-3 py-1.5 rounded-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {/* CTA */}
            {product.link && (
              <div className="mt-auto">
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-secondary self-start w-fit"
                >
                  <ArrayTitle text={t("product.viewProduct")} />
                </a>
              </div>
            )}
          </div>

          {/* Right: Image */}
          <div className="flex-1 relative overflow-hidden bg-neutral-900/30 min-h-[16rem] md:min-h-0">
            {product.image ? (
              <>
                <div className="absolute inset-0 bg-neutral-900/10 z-10 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-[1.03]"
                />
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-neutral-900/20 font-mono text-xs text-muted tracking-widest border-l border-border/30">
                <div className="flex flex-col items-center gap-4 opacity-50">
                  <span className="animate-pulse">_</span>
                  {`[ ${t("product.imagePlaceholder")} ]`}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.article>
    </div>
  );
}
