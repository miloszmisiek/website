import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Badge } from "../Badge";
import { Button } from "../button/Button";
import type { Product } from "../../data/schema";
import { getTranslations } from "../../i18n";
import { cn } from "../../styles/cn";

const MOBILE_BREAKPOINT = 960; // mlg breakpoint

const Z_CLASSES = ["z-[10]", "z-[11]", "z-[12]", "z-[13]"] as const;

interface ProductsParallaxProps {
  products: Product[];
}

export function ProductsParallax({ products }: ProductsParallaxProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile) {
    return <ProductsMobileList products={products} />;
  }

  return <ProductsParallaxDesktop products={products} />;
}

function ProductsParallaxDesktop({ products }: ProductsParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative mt-8 mlg:mt-16">
      {products.map((product, index) => {
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

// ─── Mobile / small-tablet list ──────────────────────────────────────────────

function ProductsMobileList({ products }: ProductsParallaxProps) {
  return (
    <div className="mt-8 divide-y divide-border">
      {products.map((product, index) => (
        <ProductMobileItem
          key={product.id}
          product={product}
          index={index}
          total={products.length}
        />
      ))}
    </div>
  );
}

interface ProductMobileItemProps {
  product: Product;
  index: number;
  total: number;
}

function ProductMobileItem({ product, index }: ProductMobileItemProps) {
  const t = getTranslations();
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.08,
      }}
      viewport={{ once: true, margin: "-40px" }}
      className="py-12 first:pt-4"
    >
      {/* Year */}
      {product.year && (
        <div className="mb-6">
          <span className="text-mono-date text-muted/90">
            {product.year}
          </span>
        </div>
      )}

      {/* Image */}
      {product.image && (
        <div className="w-full aspect-video overflow-hidden mb-8 bg-foreground/[0.05]">
          <img
            src={product.image_mobile || product.image}
            alt={product.name}
            className="w-full h-full object-cover object-top"
          />
        </div>
      )}

      {/* Name + Role */}
      <h3 className="text-heading-md mb-2 text-foreground">{product.name}</h3>
      {product.role && (
        <p className="text-label mb-6">
          {`// ${product.role}`}
        </p>
      )}

      {/* Description */}
      {product.description && (
        <p className="text-body text-muted mb-6">{product.description}</p>
      )}

      {/* Tech badges */}
      {product.technologies && product.technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {product.technologies.map((tech) => (
            <Badge key={tech} variant="neutral">
              {tech}
            </Badge>
          ))}
        </div>
      )}

      {/* CTA */}
      {product.link && (
        <Button
          href={product.link}
          variant="secondary"
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit"
        >
          {t("product.viewProduct")}
        </Button>
      )}
    </motion.article>
  );
}

// ─── Desktop parallax card ────────────────────────────────────────────────────

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

  const startRange = index / total;
  const endRange = 1;

  const scale = useTransform(
    progress,
    [startRange, endRange],
    [1, targetScale],
  );

  return (
    <div
      className={cn(
        "mlg:sticky mlg:top-24 flex items-center justify-center",
        "mlg:[&:not(:last-child)]:mb-[16vh]",
        Z_CLASSES[index],
      )}
    >
      <motion.article
        style={prefersReducedMotion ? {} : { scale }}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 80 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: "-60px" }}
        className="w-full origin-top"
      >
        <div className="card-base overflow-hidden flex flex-col-reverse lg:flex-row lg:min-h-[36rem] border border-border/60 shadow-xl group bg-card-bg">
          {/* Left: Content */}
          <div className="flex-1 p-8 lg:p-12 flex flex-col border-t lg:border-t-0 lg:border-r border-border/50 z-10 hover-gradient bg-card-bg">
            <div className="hover-gradient-bg" />
            {/* Header: Number & Year */}
            <div className="flex items-center justify-between mb-10">
              <span className="font-mono text-xs tracking-technical text-muted">
                {String(index).padStart(2, "0")}
              </span>
              {product.year && (
                <span className="text-mono-date text-muted/90">
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
                <p className="text-label text-muted/80">{`// ${product.role}`}</p>
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
                  <Badge key={tech} variant="neutral">
                    {tech}
                  </Badge>
                ))}
              </div>
            )}

            {/* CTA */}
            {product.link && (
              <div className="mt-auto">
                <Button
                  href={product.link}
                  variant="secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start w-fit"
                >
                  {t("product.viewProduct")}
                </Button>
              </div>
            )}
          </div>

          {/* Right: Image */}
          <div className="flex-1 relative overflow-hidden bg-foreground/[0.05] min-h-[16rem] sm:min-h-[24rem] lg:min-h-0">
            {product.image ? (
              <>
                <div className="absolute inset-0 bg-foreground/[0.06] z-10 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover object-top drop-shadow-2xl transition-transform duration-[2s] ease-out group-hover:scale-[1.03] z-0"
                />
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/[0.04] font-mono text-xs text-muted tracking-widest border-l border-border/30">
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
