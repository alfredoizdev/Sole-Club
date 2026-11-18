export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export const products: Product[] = [
  { id: "red-rush-low", name: "Red Rush Low", price: 189, image: "/products/red-rush-low.jpg" },
  { id: "sunset-court", name: "Sunset Court", price: 119, image: "/products/sunset-court.jpg" },
  { id: "midnight-monogram", name: "Midnight Monogram", price: 249, image: "/products/midnight-monogram.jpg" },
  { id: "varsity-red-one", name: "Varsity Red One", price: 139, image: "/products/varsity-red-one.jpg" },
  { id: "storm-grey-high", name: "Storm Grey High", price: 209, image: "/products/storm-grey-high.jpg" },
  { id: "volt-air-glide", name: "Volt Air Glide", price: 159, image: "/products/volt-air-glide.jpg" },
];

const priceFormat = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export function formatPrice(amount: number): string {
  return priceFormat.format(amount);
}
