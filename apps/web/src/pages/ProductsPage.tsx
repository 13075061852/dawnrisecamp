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
  newsletter: {
    title: string;
    body: string;
    emailLabel: string;
    placeholder: string;
    submit: string;
    success: string;
  };
  products: ProductNode[];
  productProfiles: Record<string, ProductProfile>;
};

export function ProductsPage({
  productsCopy,
  newsletter,
  products,
  productProfiles,
}: ProductsPageProps) {
  return (
    <main className="page-shell products-page">
      <Products
        {...productsCopy}
        newsletter={newsletter}
        products={products}
        productProfiles={productProfiles}
      />
    </main>
  );
}
