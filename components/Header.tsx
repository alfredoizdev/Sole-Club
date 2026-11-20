"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./CartProvider";
import styles from "./Header.module.css";

const menu = [
  { href: "/new-drops", label: "New drops" },
  { href: "/men", label: "Men" },
  { href: "/women", label: "Women" },
];

export default function Header() {
  const { count, open } = useCart();
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <a href="/" className={styles.brand}>
        Sole Club
      </a>
      <nav aria-label="Main" className={styles.nav}>
        {menu.map(({ href, label }) => {
          const current = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={current ? `${styles.navLink} ${styles.active}` : styles.navLink}
              aria-current={current ? "page" : undefined}
            >
              {label}
            </Link>
          );
        })}
      </nav>
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
