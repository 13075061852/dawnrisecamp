import { Products } from "../components/Products";
import type { ProductNode, ProductProfile } from "../types";

type ProductsPageProps = {
  productsCopy: {
    eyebrow: string;
    title: string;
    cta: string;
    productLinesLabel: string;
    partOfLabel: string;
    searchPlaceholder: string;
    noResults: string;
    genericSubtitle: string;
    genericPrimaryCta: string;
    genericBackCta: string;
  };
  products: ProductNode[];
  productProfiles: Record<string, ProductProfile>;
};

export function ProductsPage({ productsCopy, products, productProfiles }: ProductsPageProps) {
  return (
    <main className="page-shell">
      <Products {...productsCopy} products={products} productProfiles={productProfiles} />
    </main>
  );
}
