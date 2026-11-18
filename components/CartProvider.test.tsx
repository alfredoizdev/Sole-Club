import { act, renderHook } from "@testing-library/react";
import { products } from "@/lib/products";
import { CartProvider, useCart } from "./CartProvider";

const [first, second] = products;

function renderCart() {
  return renderHook(() => useCart(), { wrapper: CartProvider }).result;
}

describe("cart", () => {
  it("starts empty", () => {
    const cart = renderCart();
    expect(cart.current.count).toBe(0);
    expect(cart.current.total).toBe(0);
  });

  it("raises the count by one for each product added", () => {
    const cart = renderCart();
    act(() => cart.current.add(first));
    expect(cart.current.count).toBe(1);
    act(() => cart.current.add(second));
    expect(cart.current.count).toBe(2);
  });

  it("counts the same product twice when added twice", () => {
    const cart = renderCart();
    act(() => cart.current.add(first));
    act(() => cart.current.add(first));
    expect(cart.current.count).toBe(2);
    expect(cart.current.lines).toEqual([{ product: first, quantity: 2 }]);
    expect(cart.current.total).toBe(first.price * 2);
  });

  it("removes a product line", () => {
    const cart = renderCart();
    act(() => cart.current.add(first));
    act(() => cart.current.add(first));
    act(() => cart.current.add(second));
    act(() => cart.current.remove(first.id));
    expect(cart.current.count).toBe(1);
    expect(cart.current.total).toBe(second.price);
  });

  it("opens and closes", () => {
    const cart = renderCart();
    act(() => cart.current.open());
    expect(cart.current.isOpen).toBe(true);
    act(() => cart.current.close());
    expect(cart.current.isOpen).toBe(false);
  });
});
