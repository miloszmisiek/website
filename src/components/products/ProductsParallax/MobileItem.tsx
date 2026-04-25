import { motion } from "framer-motion";
import { Badge } from "../../Badge";
import { Button } from "../../button/Button";
import { getTranslations } from "../../../i18n";
import type { Product } from "../../../data/schema";
import { EASE_SMOOTH } from "../../../styles/animations";

const MOBILE_ITEM_ANIMATION = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
};

type ProductMobileItemProps = {
  product: Product;
  index: number;
};

export function ProductMobileItem({
  product: {
    year,
    nda,
    name,
    link,
    image,
    image_mobile,
    role,
    description,
    technologies,
  },
  index,
}: ProductMobileItemProps) {
  const t = getTranslations();

  return (
    <motion.article
      {...MOBILE_ITEM_ANIMATION}
      transition={{
        duration: 0.6,
        ease: EASE_SMOOTH,
        delay: index * 0.08,
      }}
      className="py-12 first:pt-4"
    >
      {year && (
        <div className="mb-6 flex items-center gap-2">
          {nda && <Badge variant="warning">{t("product.nda")}</Badge>}
          <span className="text-mono-date text-muted/90">{year}</span>
        </div>
      )}
      {!year && nda && (
        <div className="mb-6">
          <Badge variant="warning">{t("product.nda")}</Badge>
        </div>
      )}

      {image && (
        <div className="w-full aspect-video overflow-hidden mb-8 bg-foreground/[0.05]">
          <img
            src={image_mobile || image}
            alt={name}
            className="w-full h-full object-cover object-top"
          />
        </div>
      )}

      <h3 className="text-heading-md mb-2 text-foreground">{name}</h3>
      <p className="text-label mb-6">{`// ${role}`}</p>
      <p className="text-body text-muted mb-6">{description}</p>

      {technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {technologies.map((tech) => (
            <Badge key={tech} variant="neutral">
              {tech}
            </Badge>
          ))}
        </div>
      )}

      {link && (
        <Button
          href={link}
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
