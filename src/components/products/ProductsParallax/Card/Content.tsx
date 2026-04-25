// GOOD
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
    <div className="flex-1 p-8 lg:p-12 flex flex-col border-t lg:border-t-0 lg:border-r border-border/50 z-10 hover-gradient bg-card-bg">
      <div className="hover-gradient-bg" />
      <div className="flex items-center justify-between mb-10">
        <span className="font-mono text-xs tracking-technical text-muted">
          {String(index).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-2">
          {product.nda && <Badge variant="warning">{t("product.nda")}</Badge>}
          {product.year && (
            <span className="text-mono-date text-muted/90">{product.year}</span>
          )}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-heading-lg mb-4 text-foreground">{product.name}</h3>
        <p className="text-label text-muted/80">{`// ${product.role}`}</p>
      </div>

      <p className="text-body text-muted/90 mb-10 grow max-w-xl">
        {product.description}
      </p>

      {product.technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
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
            className="self-start w-fit"
          >
            {t("product.viewProduct")}
          </Button>
        </div>
      )}
    </div>
  );
}
