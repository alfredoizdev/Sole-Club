import { existsSync } from "node:fs";
import { join } from "node:path";
import { formatPrice, products } from "./products";

describe("products", () => {
  it("has six products, each with a photo, name and price", () => {
    expect(products).toHaveLength(6);
    for (const product of products) {
      expect(product.name).not.toBe("");
      expect(product.price).toBeGreaterThan(0);
      expect(existsSync(join(process.cwd(), "public", product.image))).toBe(true);
    }
  });

  it("uses a unique id for every product", () => {
    expect(new Set(products.map((p) => p.id)).size).toBe(products.length);
  });

  it("formats prices as dollars", () => {
    expect(formatPrice(189)).toBe("$189.00");
  });
});
