"use client";

import Image from "next/image";
import { useEffect } from "react";
import { formatPrice } from "@/lib/products";
import { useCart } from "./CartProvider";
import styles from "./CartPanel.module.css";

export default function CartPanel() {
  const { lines, total, isOpen, close, remove } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  return (
    <div className={isOpen ? `${styles.root} ${styles.open}` : styles.root} inert={!isOpen}>
      <div className={styles.backdrop} onClick={close} data-testid="cart-backdrop" />
      <aside className={styles.panel} role="dialog" aria-modal="true" aria-label="Your cart">
        <div className={styles.head}>
          <h2 className={styles.title}>Your cart</h2>
          <button type="button" className={styles.close} onClick={close} aria-label="Close cart">
            ×
          </button>
        </div>

        {lines.length === 0 ? (
          <p className={styles.empty}>Your cart is empty.</p>
        ) : (
          <ul className={styles.list}>
            {lines.map(({ product, quantity }) => (
              <li key={product.id} className={styles.item}>
                <div className={styles.thumb}>
                  <Image src={product.image} alt={product.name} fill sizes="72px" className={styles.thumbImage} />
                </div>
                <div className={styles.details}>
                  <p className={styles.name}>{product.name}</p>
                  <p className={styles.price}>
                    {formatPrice(product.price)}
                    {quantity > 1 && <span className={styles.qty}> × {quantity}</span>}
                  </p>
                </div>
                <button
                  type="button"
                  className={styles.remove}
                  onClick={() => remove(product.id)}
                  aria-label={`Remove ${product.name}`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className={styles.footer}>
          <span>Total</span>
          <strong data-testid="cart-total">{formatPrice(total)}</strong>
        </div>
      </aside>
    </div>
  );
}
