import styles from "./Banner.module.css";

export default function Banner() {
  return (
    <section className={styles.banner}>
      <p className={styles.eyebrow}>New drops</p>
      <h1 className={styles.title}>Fresh pairs every week</h1>
    </section>
  );
}
