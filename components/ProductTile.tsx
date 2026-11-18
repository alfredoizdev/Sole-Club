"use client";

import Image from "next/image";
import { formatPrice, type Product } from "@/lib/products";
import { useCart } from "./CartProvider";
import styles from "./ProductTile.module.css";

type Props = { product: Product; featured?: boolean };

export default function ProductTile({ product, featured = false }: Props) {
  const { add } = useCart();

  return (
    <li className={featured ? `${styles.tile} ${styles.featured}` : styles.tile}>
      <Image
        src={product.image}
        alt={product.name}
        fill
        priority={featured}
        sizes={featured ? "(max-width: 900px) 100vw, 66vw" : "(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"}
        className={styles.photo}
      />
      <div className={styles.info}>
        <div>
          <h2 className={styles.name}>{product.name}</h2>
          <p className={styles.price}>{formatPrice(product.price)}</p>
        </div>
        <button
          type="button"
          className={styles.add}
          onClick={() => add(product)}
        >
          Add to cart
        </button>
      </div>
    </li>
  );
}
