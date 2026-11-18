import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.brand}>Sole Club</span>
      <span>© {new Date().getFullYear()} Sole Club. All rights reserved.</span>
    </footer>
  );
}
