import type { Product } from "@/lib/products";
import ProductTile from "./ProductTile";
import styles from "./ProductMosaic.module.css";

export default function ProductMosaic({ products }: { products: Product[] }) {
  return (
    <section id="products" aria-label="Products">
      <ul className={styles.grid}>
        {products.map((product, index) => (
          <ProductTile key={product.id} product={product} featured={index === 0} />
        ))}
      </ul>
    </section>
  );
}
