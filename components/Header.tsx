"use client";

import { useCart } from "./CartProvider";
import styles from "./Header.module.css";

export default function Header() {
  const { count, open } = useCart();

  return (
    <header className={styles.header}>
      <a href="/" className={styles.brand}>
        Sole Club
      </a>
      <button
        type="button"
        className={styles.cartButton}
        onClick={open}
        aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path
            d="M6 7h12l-1.2 12.1a1 1 0 0 1-1 .9H8.2a1 1 0 0 1-1-.9L6 7Zm3 0V6a3 3 0 0 1 6 0v1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
        <span className={styles.badge} data-testid="cart-count">
          {count}
        </span>
      </button>
    </header>
  );
}
