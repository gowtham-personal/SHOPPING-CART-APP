import { fireEvent, render, screen } from "@/test-utils";

import Header from "./index";

// Mock the useCartStore hook
const mockUseCartStore = jest.fn();
jest.mock("@/hooks/useCartStore", () => ({
  useCartStore: () => mockUseCartStore(),
}));

describe("Header", () => {
  const defaultCartStore = {
    cart: {
      items: [],
      total: 0,
      itemCount: 0,
    },
    showCart: false,
    setShowCart: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseCartStore.mockReturnValue(defaultCartStore);
  });

  it("should render the header component without errors", () => {
    const spy = jest.spyOn(global.console, "error");
    render(<Header />);
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it("should render the logo image with correct attributes", () => {
    render(<Header />);

    const logo = screen.getByRole("img", { name: "Product Store" });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/equal_experts_logo.jpeg");
    expect(logo).toHaveAttribute("alt", "Product Store");
    expect(logo).toHaveClass("h-10", "w-10");
  });

  it("should render the brand text correctly", () => {
    render(<Header />);

    const brandText = screen.getByText("Product Store");
    expect(brandText).toBeInTheDocument();
  });

  it("should render the cart button with correct default text when cart is hidden", () => {
    render(<Header />);

    const cartButton = screen.getByRole("button", {
      name: /shopping cart with 0 items/i,
    });
    expect(cartButton).toBeInTheDocument();
    expect(screen.getByText("View Cart")).toBeInTheDocument();
  });

  it('should render the cart button with "Hide Cart" text when cart is shown', () => {
    mockUseCartStore.mockReturnValue({
      ...defaultCartStore,
      showCart: true,
    });

    render(<Header />);

    const cartButton = screen.getByRole("button", {
      name: /shopping cart with 0 items/i,
    });
    expect(cartButton).toBeInTheDocument();
    expect(screen.getByText("Hide Cart")).toBeInTheDocument();
  });

  it("should render cart button with shopping cart icon", () => {
    render(<Header />);

    const cartButton = screen.getByRole("button", {
      name: /shopping cart with 0 items/i,
    });
    expect(cartButton).toBeInTheDocument();

    // Check if the shopping cart icon (lucide-react) is present
    const icon = cartButton.querySelector("svg");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("h-5", "w-5");
  });

  it("should not render cart badge when cart is empty", () => {
    render(<Header />);

    const badge = screen.queryByText("0");
    expect(badge).not.toBeInTheDocument();
  });

  it("should render cart badge when cart has items", () => {
    mockUseCartStore.mockReturnValue({
      ...defaultCartStore,
      cart: {
        items: [],
        total: 0,
        itemCount: 3,
      },
    });

    render(<Header />);

    const badge = screen.getByText("3");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass(
      "absolute",
      "-top-2",
      "-right-2",
      "bg-sky-600",
      "text-white",
      "text-xs",
      "rounded-full",
      "h-6",
      "w-6",
      "flex",
      "items-center",
      "justify-center",
      "font-medium",
    );
  });

  it('should render "99+" when cart has more than 99 items', () => {
    mockUseCartStore.mockReturnValue({
      ...defaultCartStore,
      cart: {
        items: [],
        total: 0,
        itemCount: 150,
      },
    });

    render(<Header />);

    const badge = screen.getByText("99+");
    expect(badge).toBeInTheDocument();
  });

  it("should display correct aria-label with item count", () => {
    mockUseCartStore.mockReturnValue({
      ...defaultCartStore,
      cart: {
        items: [],
        total: 0,
        itemCount: 5,
      },
    });

    render(<Header />);

    const cartButton = screen.getByRole("button", {
      name: /shopping cart with 5 items/i,
    });
    expect(cartButton).toBeInTheDocument();
  });

  it("should call setShowCart when cart button is clicked", () => {
    const mockSetShowCart = jest.fn();
    mockUseCartStore.mockReturnValue({
      ...defaultCartStore,
      setShowCart: mockSetShowCart,
    });

    render(<Header />);

    const cartButton = screen.getByRole("button", {
      name: /shopping cart with 0 items/i,
    });
    fireEvent.click(cartButton);

    expect(mockSetShowCart).toHaveBeenCalledTimes(1);
    expect(mockSetShowCart).toHaveBeenCalledWith(true);
  });

  it("should toggle showCart state when clicked multiple times", () => {
    const mockSetShowCart = jest.fn();
    mockUseCartStore.mockReturnValue({
      ...defaultCartStore,
      showCart: true,
      setShowCart: mockSetShowCart,
    });

    render(<Header />);

    const cartButton = screen.getByRole("button", {
      name: /shopping cart with 0 items/i,
    });
    fireEvent.click(cartButton);

    expect(mockSetShowCart).toHaveBeenCalledTimes(1);
    expect(mockSetShowCart).toHaveBeenCalledWith(false);
  });

  it("should have correct CSS classes for header container", () => {
    const { container } = render(<Header />);

    const headerContainer = container.firstChild as HTMLElement;
    expect(headerContainer).toHaveClass(
      "bg-white",
      "shadow-sm",
      "border-b",
      "sticky",
      "top-0",
      "z-10",
    );
  });

  it("should have correct layout structure", () => {
    render(<Header />);

    // Check for the main header container by finding the element with the sticky header classes
    const headerContainer = screen.getByText("Product Store").closest("div")
      ?.parentElement?.parentElement?.parentElement;
    expect(headerContainer).toBeInTheDocument();
    expect(headerContainer).toHaveClass(
      "bg-white",
      "shadow-sm",
      "border-b",
      "sticky",
      "top-0",
      "z-10",
    );

    // Check for logo and brand section
    const logo = screen.getByRole("img", { name: "Product Store" });
    const brandText = screen.getByText("Product Store");
    expect(logo.parentElement).toContainElement(brandText);

    // Check for cart button section
    const cartButton = screen.getByRole("button", { name: /shopping cart/i });
    expect(cartButton).toBeInTheDocument();
  });

  it("should render cart badge with exact count for values 1-99", () => {
    const testCounts = [1, 15, 50, 99];

    testCounts.forEach((count) => {
      mockUseCartStore.mockReturnValue({
        ...defaultCartStore,
        cart: {
          items: [],
          total: 0,
          itemCount: count,
        },
      });

      const { rerender } = render(<Header />);

      const badge = screen.getByText(count.toString());
      expect(badge).toBeInTheDocument();

      rerender(<div />); // Clean up for next iteration
    });
  });
});
