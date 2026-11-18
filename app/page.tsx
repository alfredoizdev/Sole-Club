import Banner from "@/components/Banner";
import CartPanel from "@/components/CartPanel";
import { CartProvider } from "@/components/CartProvider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductMosaic from "@/components/ProductMosaic";
import { products } from "@/lib/products";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <CartProvider>
      <div className={styles.page}>
        <Header />
        <main className={styles.main}>
          <Banner />
          <ProductMosaic products={products} />
        </main>
        <Footer />
      </div>
      <CartPanel />
    </CartProvider>
  );
}
