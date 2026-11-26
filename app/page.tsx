import Banner from "@/components/Banner";
import CartPanel from "@/components/CartPanel";
import { CartProvider } from "@/components/CartProvider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductMosaic from "@/components/ProductMosaic";
import { products } from "@/lib/products";
import styles from "./page.module.css";

const bannerProduct = products.find((product) => product.id === "volt-air-glide")!;

export default function HomePage() {
  return (
    <CartProvider>
      <div className={styles.page}>
        <Header />
        <main className={styles.main}>
          <Banner product={bannerProduct} />
          <div className={styles.content}>
            <ProductMosaic products={products} />
          </div>
        </main>
        <Footer />
      </div>
      <CartPanel />
    </CartProvider>
  );
}
