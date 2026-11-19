import Image from "next/image";
import type { Product } from "@/lib/products";
import styles from "./Banner.module.css";

export default function Banner({ product }: { product: Product }) {
  return (
    <section className={styles.banner}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>New drops</p>
        <h1 className={styles.title}>Fresh pairs every week</h1>
        <a href="#products" className={styles.cta}>
          Shop now
        </a>
      </div>
      <div className={styles.sneaker} data-testid="banner-sneaker">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 760px) 80vw, 40vw"
          className={styles.photo}
        />
      </div>
    </section>
  );
}
