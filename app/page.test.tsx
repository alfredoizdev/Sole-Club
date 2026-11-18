import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { formatPrice, products } from "@/lib/products";
import HomePage from "./page";

function setup() {
  const user = userEvent.setup();
  render(<HomePage />);
  const tiles = within(screen.getByRole("region", { name: "Products" })).getAllByRole("listitem");
  const cartCount = () => screen.getByTestId("cart-count").textContent;
  const dialog = () => screen.getByRole("dialog", { name: "Your cart", hidden: true });
  return { user, tiles, cartCount, dialog };
}

describe("home page", () => {
  it("shows the store name and a cart icon starting at zero", () => {
    const { cartCount } = setup();
    expect(screen.getByRole("banner")).toHaveTextContent("Sole Club");
    expect(screen.getByRole("button", { name: /open cart, 0 items/i })).toBeInTheDocument();
    expect(cartCount()).toBe("0");
  });

  it("shows the banner headline and the footer", () => {
    setup();
    expect(screen.getByRole("heading", { level: 1, name: "Fresh pairs every week" })).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toHaveTextContent("Sole Club");
  });

  it("shows six tiles with photo, name, price and an Add to cart button, the first one featured", () => {
    const { tiles } = setup();
    expect(tiles).toHaveLength(6);
    tiles.forEach((tile, index) => {
      const product = products[index];
      expect(within(tile).getByRole("img", { name: product.name })).toBeInTheDocument();
      expect(within(tile).getByRole("heading", { name: product.name })).toBeInTheDocument();
      expect(within(tile).getByText(formatPrice(product.price))).toBeInTheDocument();
      expect(within(tile).getByRole("button", { name: "Add to cart" })).toBeInTheDocument();
    });
    expect(tiles[0]).toHaveClass("featured");
    tiles.slice(1).forEach((tile) => expect(tile).not.toHaveClass("featured"));
  });

  it("raises the menu cart count when Add to cart is clicked", async () => {
    const { user, tiles, cartCount } = setup();
    await user.click(within(tiles[0]).getByRole("button", { name: "Add to cart" }));
    expect(cartCount()).toBe("1");
    await user.click(within(tiles[0]).getByRole("button", { name: "Add to cart" }));
    await user.click(within(tiles[3]).getByRole("button", { name: "Add to cart" }));
    expect(cartCount()).toBe("3");
    expect(screen.getByRole("button", { name: /open cart, 3 items/i })).toBeInTheDocument();
  });

  it("opens the cart panel with the added items, their total, and removes items", async () => {
    const { user, tiles, cartCount, dialog } = setup();
    const [a, , , d] = products;
    await user.click(within(tiles[0]).getByRole("button", { name: "Add to cart" }));
    await user.click(within(tiles[0]).getByRole("button", { name: "Add to cart" }));
    await user.click(within(tiles[3]).getByRole("button", { name: "Add to cart" }));

    await user.click(screen.getByRole("button", { name: /open cart/i }));
    const panel = within(dialog());
    expect(panel.getByRole("img", { name: a.name })).toBeInTheDocument();
    expect(panel.getByText(a.name)).toBeInTheDocument();
    expect(panel.getByText(d.name)).toBeInTheDocument();
    expect(panel.getByTestId("cart-total")).toHaveTextContent(formatPrice(a.price * 2 + d.price));

    await user.click(panel.getByRole("button", { name: `Remove ${a.name}` }));
    expect(panel.queryByText(a.name)).not.toBeInTheDocument();
    expect(panel.getByTestId("cart-total")).toHaveTextContent(formatPrice(d.price));
    expect(cartCount()).toBe("1");
  });

  it("closes the cart panel with the X button or by clicking outside", async () => {
    const { user, dialog } = setup();
    const root = () => dialog().parentElement!;
    expect(root()).toHaveAttribute("inert");

    await user.click(screen.getByRole("button", { name: /open cart/i }));
    expect(root()).not.toHaveAttribute("inert");
    expect(within(dialog()).getByText("Your cart is empty.")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Close cart" }));
    expect(root()).toHaveAttribute("inert");

    await user.click(screen.getByRole("button", { name: /open cart/i }));
    await user.click(screen.getByTestId("cart-backdrop"));
    expect(root()).toHaveAttribute("inert");
  });
});
