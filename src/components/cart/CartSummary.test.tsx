import CartSummary from "@/components/cart/CartSummary";
import { useCartStore } from "@/hooks/useCartStore";
import type { Product } from "@/interfaces/product";
import { fireEvent, render, screen } from "@/test-utils";

const mockAddToCart = jest.fn();
const mockRemoveFromCart = jest.fn();
const mockClearCart = jest.fn();

jest.mock("@/hooks/useCartStore", () => ({
  useCartStore: jest.fn(),
}));

const mockUseCartStore = useCartStore as jest.MockedFunction<
  typeof useCartStore
>;

const mockProduct: Product = {
  id: 1,
  title: "Test Product",
  price: 29.99,
  description: "Test product description",
  category: "electronics",
  image: "https://example.com/image.jpg",
  rating: {
    rate: 4.5,
    count: 100,
  },
};

const getRenderedComponent = () => {
  return render(<CartSummary />);
};

describe("CartSummary", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseCartStore.mockReturnValue({
      cart: {
        items: [],
        total: 0,
        itemCount: 0,
      },
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      clearCart: jest.fn(),
    });
  });

  describe("Empty Cart State", () => {
    it("should render empty cart message when cart has no items", () => {
      getRenderedComponent();

      expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
      expect(
        screen.getByText("Start shopping to add items to your cart"),
      ).toBeInTheDocument();
    });

    it("should display shopping cart icon for empty cart", () => {
      getRenderedComponent();

      const cartIcon = document.querySelector("svg");
      expect(cartIcon).toBeInTheDocument();
    });

    it("should not display cart header when cart is empty", () => {
      getRenderedComponent();

      expect(screen.queryByText(/Shopping Cart \(/)).not.toBeInTheDocument();
    });

    it("should not display checkout button when cart is empty", () => {
      getRenderedComponent();

      expect(screen.queryByText("Proceed to Checkout")).not.toBeInTheDocument();
    });
  });

  describe("Cart with Items", () => {
    beforeEach(() => {
      mockUseCartStore.mockReturnValue({
        cart: {
          items: [
            {
              product: mockProduct,
              quantity: 2,
            },
          ],
          total: 59.98,
          itemCount: 2,
        },
        showCart: false,
        setCart: jest.fn(),
        setShowCart: jest.fn(),
        addToCart: mockAddToCart,
        removeFromCart: mockRemoveFromCart,
        clearCart: mockClearCart,
      });
    });

    it("should render cart header with correct item count", () => {
      getRenderedComponent();

      expect(screen.getByText("Shopping Cart (2 items)")).toBeInTheDocument();
    });

    it("should display product information correctly", () => {
      getRenderedComponent();

      expect(screen.getByText("Test Product")).toBeInTheDocument();
      expect(screen.getByText("(£29.99 each)")).toBeInTheDocument();
      expect(screen.getByAltText("Test Product")).toBeInTheDocument();
    });

    it("should display correct product image", () => {
      getRenderedComponent();

      const productImage = screen.getByAltText(
        "Test Product",
      ) as HTMLImageElement;
      expect(productImage.src).toBe("https://example.com/image.jpg");
    });

    it("should display correct line total for product", () => {
      getRenderedComponent();

      // Find the line total specifically (not the cart total)
      const lineTotalElements = screen.getAllByText("£59.98");
      expect(lineTotalElements).toHaveLength(2); // Line total and cart total
    });

    it("should display correct cart total", () => {
      getRenderedComponent();

      expect(screen.getByText("Total:")).toBeInTheDocument();
      // Find all instances and ensure we have both line and cart totals
      const totalElements = screen.getAllByText("£59.98");
      expect(totalElements).toHaveLength(2);
    });

    it("should render quantity controls for each item", () => {
      getRenderedComponent();

      expect(screen.getByTestId("quantity-controls")).toBeInTheDocument();
    });

    it("should display proceed to checkout button", () => {
      getRenderedComponent();

      expect(screen.getByText("Proceed to Checkout")).toBeInTheDocument();
    });

    it("should call clearCart when clear cart icon is clicked", () => {
      getRenderedComponent();

      // The trash icon is not a button but an Icon component with onClick handler
      // Find it by the SVG element with the trash icon class
      const trashIcon = document.querySelector("svg.lucide-trash-2");
      expect(trashIcon).toBeInTheDocument();

      fireEvent.click(trashIcon!);
      expect(mockClearCart).toHaveBeenCalledTimes(1);
    });

    it("should handle quantity increment through QuantityControls", () => {
      getRenderedComponent();

      const incrementButton = screen.getByLabelText("Increase quantity");
      fireEvent.click(incrementButton);

      expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
    });

    it("should handle quantity decrement through QuantityControls", () => {
      getRenderedComponent();

      const decrementButton = screen.getByLabelText("Decrease quantity");
      fireEvent.click(decrementButton);

      expect(mockRemoveFromCart).toHaveBeenCalledWith(mockProduct.id);
    });
  });

  describe("Cart with Multiple Items", () => {
    beforeEach(() => {
      const secondProduct: Product = {
        ...mockProduct,
        id: 2,
        title: "Second Product",
        price: 15.5,
      };

      mockUseCartStore.mockReturnValue({
        cart: {
          items: [
            {
              product: mockProduct,
              quantity: 1,
            },
            {
              product: secondProduct,
              quantity: 3,
            },
          ],
          total: 76.49,
          itemCount: 4,
        },
        showCart: false,
        setCart: jest.fn(),
        setShowCart: jest.fn(),
        addToCart: mockAddToCart,
        removeFromCart: mockRemoveFromCart,
        clearCart: mockClearCart,
      });
    });

    it("should render all cart items", () => {
      getRenderedComponent();

      expect(screen.getByText("Test Product")).toBeInTheDocument();
      expect(screen.getByText("Second Product")).toBeInTheDocument();
    });

    it("should display correct total item count in header", () => {
      getRenderedComponent();

      expect(screen.getByText("Shopping Cart (4 items)")).toBeInTheDocument();
    });

    it("should display correct individual line totals", () => {
      getRenderedComponent();

      expect(screen.getByText("£29.99")).toBeInTheDocument(); // First item line total
      expect(screen.getByText("£46.50")).toBeInTheDocument(); // Second item line total (15.50 * 3)
    });

    it("should display correct cart total", () => {
      getRenderedComponent();

      // Cart total appears once in the footer
      const cartTotalElements = screen.getAllByText("£76.49");
      expect(cartTotalElements.length).toBeGreaterThanOrEqual(1);
    });

    it("should render quantity controls for each item", () => {
      getRenderedComponent();

      const quantityControls = screen.getAllByTestId("quantity-controls");
      expect(quantityControls).toHaveLength(2);
    });
  });

  describe("Price Formatting", () => {
    beforeEach(() => {
      const productWithComplexPrice: Product = {
        ...mockProduct,
        price: 123.456, // Test decimal formatting
      };

      mockUseCartStore.mockReturnValue({
        cart: {
          items: [
            {
              product: productWithComplexPrice,
              quantity: 1,
            },
          ],
          total: 123.456,
          itemCount: 1,
        },
        showCart: false,
        setCart: jest.fn(),
        setShowCart: jest.fn(),
        addToCart: mockAddToCart,
        removeFromCart: mockRemoveFromCart,
        clearCart: mockClearCart,
      });
    });

    it("should format prices to 2 decimal places", () => {
      getRenderedComponent();

      expect(screen.getByText("(£123.46 each)")).toBeInTheDocument();
      // Price appears in both line total and cart total
      const priceElements = screen.getAllByText("£123.46");
      expect(priceElements.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("Accessibility", () => {
    beforeEach(() => {
      mockUseCartStore.mockReturnValue({
        cart: {
          items: [
            {
              product: mockProduct,
              quantity: 1,
            },
          ],
          total: 29.99,
          itemCount: 1,
        },
        showCart: false,
        setCart: jest.fn(),
        setShowCart: jest.fn(),
        addToCart: mockAddToCart,
        removeFromCart: mockRemoveFromCart,
        clearCart: mockClearCart,
      });
    });

    it("should have proper alt text for product images", () => {
      getRenderedComponent();

      const productImage = screen.getByAltText("Test Product");
      expect(productImage).toBeInTheDocument();
    });

    it("should have accessible button for proceed to checkout", () => {
      getRenderedComponent();

      const checkoutButton = screen.getByRole("button", {
        name: /proceed to checkout/i,
      });
      expect(checkoutButton).toBeInTheDocument();
    });
  });
});
