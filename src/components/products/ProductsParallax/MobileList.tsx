import { ProductMobileItem } from "./MobileItem";
import type { ProductsListProps } from "./types";

export function ProductsMobileList({ products }: ProductsListProps) {
  return (
    <div className="mt-8 divide-y divide-border">
      {products.map((product) => (
        <ProductMobileItem key={product.id} product={product} />
      ))}
    </div>
  );
}
