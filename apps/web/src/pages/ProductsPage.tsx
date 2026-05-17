import { Products } from "../components/Products";
import type { ProductNode } from "../types";

type ProductsPageProps = {
  productsCopy: {
    eyebrow: string;
    title: string;
    cta: string;
  };
  products: ProductNode[];
};

export function ProductsPage({ productsCopy, products }: ProductsPageProps) {
  return (
    <main className="page-shell">
      <Products {...productsCopy} products={products} />
    </main>
  );
}

