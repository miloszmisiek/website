import { Badge } from "../../../Badge";
import { Button } from "../../../button/Button";
import { getTranslations } from "../../../../i18n";
import type { Product } from "../../../../data/schema";

type CardContentProps = {
  product: Product;
  index: number;
};

export function CardContent({ product, index }: CardContentProps) {
  const t = getTranslations();

  return (
    <div className="flex-1 p-8 lg:p-12 short:lg:p-10 flex flex-col border-t lg:border-t-0 lg:border-r border-border/50 z-10 hover-gradient bg-card-bg">
      <div className="hover-gradient-bg" />
      <div className="flex items-center justify-between mb-10 short:mb-4">
        <span className="font-mono text-xs tracking-technical text-muted">
          {String(index).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-2">
          {product.nda && <Badge variant="restricted">{t("product.nda")}</Badge>}
          {product.year && (
            <span className="text-mono-date text-muted/90">{product.year}</span>
          )}
        </div>
      </div>

      <div className="mb-8 short:mb-4">
        <h3 className="text-heading-contact text-5xl md:text-5xl lg:text-6xl short:text-4xl short:leading-heading mb-4 short:mb-2">{product.name}</h3>
        <p className="text-label short:text-sm text-muted/80">{`// ${product.role}`}</p>
      </div>

      <p className="text-body text-base md:text-lg short:text-base mb-10 short:mb-5 grow max-w-xl">
        {product.description}
      </p>

      {product.technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10 short:mb-5">
          {product.technologies.map((tech) => (
            <Badge key={tech} variant="neutral">
              {tech}
            </Badge>
          ))}
        </div>
      )}

      {product.link && (
        <div className="mt-auto">
          <Button
            href={product.link}
            variant="secondary"
            target="_blank"
            rel="noopener noreferrer"
            className="self-start w-fit short:text-xs"
          >
            {t("product.viewProduct")}
          </Button>
        </div>
      )}
    </div>
  );
}
