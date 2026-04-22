// GOOD
import { ImagePlaceholder } from "./ImagePlaceholder";
import type { Product } from "../../../../data/schema";

type CardImageProps = {
  product: Product;
};

export function CardImage({ product }: CardImageProps) {
  return (
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
        <ImagePlaceholder />
      )}
    </div>
  );
}
