import { readFileSync } from "node:fs";
import { render, screen, within } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { CartProvider } from "./CartProvider";
import Header from "./Header";

vi.mock("next/navigation", () => ({ usePathname: vi.fn() }));

function renderHeader(pathname: string) {
  vi.mocked(usePathname).mockReturnValue(pathname);
  render(
    <CartProvider>
      <Header />
    </CartProvider>,
  );
  return within(screen.getByRole("navigation", { name: "Main" }));
}

describe("header menu", () => {
  it("shows New drops, Men and Women between the logo and the cart", () => {
    const nav = renderHeader("/");
    const links = nav.getAllByRole("link");
    expect(links.map((link) => link.textContent)).toEqual(["New drops", "Men", "Women"]);
    expect(links.map((link) => link.getAttribute("href"))).toEqual(["/new-drops", "/men", "/women"]);
    links.forEach((link) => expect(link).not.toHaveClass("active"));

    const [brand, menu, cart] = Array.from(screen.getByRole("banner").children);
    expect(brand).toHaveTextContent("Sole Club");
    expect(menu).toHaveAccessibleName("Main");
    expect(cart).toHaveAccessibleName(/open cart/i);
  });

  it.each([
    ["/new-drops", "New drops"],
    ["/men", "Men"],
    ["/women", "Women"],
  ])("marks only the link for %s as the current page", (pathname, label) => {
    const nav = renderHeader(pathname);
    nav.getAllByRole("link").forEach((link) => {
      const isCurrent = link.textContent === label;
      expect(link).toHaveClass("navLink");
      expect(link.classList.contains("active")).toBe(isCurrent);
      expect(link.getAttribute("aria-current")).toBe(isCurrent ? "page" : null);
    });
  });

  it("colors the current link with the Shop now red", () => {
    const css = readFileSync("components/Header.module.css", "utf8");
    expect(css).toMatch(/\.navLink\.active \{[^}]*color: var\(--red\);/);
    expect(css).toMatch(/\.header \{[^}]*grid-template-columns: 1fr auto 1fr;/);
  });

  it("moves the menu to its own row under the logo and cart on narrow screens", () => {
    const css = readFileSync("components/Header.module.css", "utf8");
    const narrow = css.match(/@media \(max-width: 640px\) \{([\s\S]*)\}\s*$/)?.[1] ?? "";
    expect(narrow).toMatch(/\.header \{[^}]*grid-template-columns: 1fr auto;/);
    expect(narrow).toMatch(/\.header \{[^}]*grid-template-areas:\s*"brand cart"\s*"nav nav";/);
    expect(narrow).toMatch(/\.brand \{[^}]*grid-area: brand;/);
    expect(narrow).toMatch(/\.nav \{[^}]*grid-area: nav;[^}]*justify-content: center;/);
    expect(narrow).toMatch(/\.cartButton \{[^}]*grid-area: cart;/);
  });
});
