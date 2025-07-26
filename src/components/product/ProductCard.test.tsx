import ProductCard, {
  type ProductCardProps,
} from "@/components/product/ProductCard";
import { useCartStore } from "@/hooks/useCartStore";
import type { Product } from "@/interfaces/product";
import { render, screen, userEvent } from "@/test-utils";

// Mock the cart store
const mockAddToCart = jest.fn();
const mockRemoveFromCart = jest.fn();

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
  description: "This is a test product description",
  category: "electronics",
  image: "https://example.com/image.jpg",
  rating: {
    rate: 4.5,
    count: 120,
  },
};

const getRenderedComponent = (args: Partial<ProductCardProps> = {}) => {
  const defaultProps: ProductCardProps = {
    product: mockProduct,
    onAddToCart: jest.fn(),
    ...args,
  };
  return render(<ProductCard {...defaultProps} />);
};

describe("ProductCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Set default mock implementation
    mockUseCartStore.mockReturnValue({
      cart: {
        items: [],
        total: 0,
        itemCount: 0,
      },
      addToCart: mockAddToCart,
      removeFromCart: mockRemoveFromCart,
    });
  });

  it("should match snapshot with default props", () => {
    const { container } = getRenderedComponent();
    expect(container).toMatchSnapshot();
  });

  it("should render without errors", () => {
    const spy = jest.spyOn(global.console, "error");
    getRenderedComponent();
    expect(spy).not.toHaveBeenCalled();
  });

  it("should render product title correctly", () => {
    getRenderedComponent();
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  it("should render product description correctly", () => {
    getRenderedComponent();
    expect(
      screen.getByText("This is a test product description"),
    ).toBeInTheDocument();
  });

  it("should render formatted price correctly", () => {
    getRenderedComponent();
    expect(screen.getByText("£29.99")).toBeInTheDocument();
  });

  it("should render product image with correct attributes", () => {
    getRenderedComponent();
    const image = screen.getByRole("img", { name: "Test Product" });
    expect(image).toHaveAttribute("src", "https://example.com/image.jpg");
    expect(image).toHaveAttribute("alt", "Test Product");
    expect(image).toHaveAttribute("loading", "lazy");
  });

  it("should render rating component", () => {
    getRenderedComponent();
    // StarRating component should be rendered - we can check if rating-related content exists
    expect(screen.getByText("(120 reviews)")).toBeInTheDocument(); // count from rating
  });

  it("should show Add to Cart button when item is not in cart", () => {
    getRenderedComponent();
    const addButton = screen.getByRole("button", {
      name: /add test product to cart/i,
    });
    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveTextContent("Add to Cart");
  });

  it("should call addToCart when Add to Cart button is clicked", async () => {
    const user = userEvent.setup();
    getRenderedComponent();

    const addButton = screen.getByRole("button", {
      name: /add test product to cart/i,
    });
    await user.click(addButton);

    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it("should show quantity controls when item is in cart", () => {
    // Mock cart with item in it
    mockUseCartStore.mockReturnValueOnce({
      cart: {
        items: [{ product: mockProduct, quantity: 2 }],
        total: 59.98,
        itemCount: 2,
      },
      addToCart: mockAddToCart,
      removeFromCart: mockRemoveFromCart,
    });

    getRenderedComponent();
    expect(
      screen.getByRole("button", { name: /decrease quantity/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /increase quantity/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("should call addToCart when increment button is clicked in quantity controls", async () => {
    // Mock cart with item in it
    mockUseCartStore.mockReturnValueOnce({
      cart: {
        items: [{ product: mockProduct, quantity: 1 }],
        total: 29.99,
        itemCount: 1,
      },
      addToCart: mockAddToCart,
      removeFromCart: mockRemoveFromCart,
    });

    const user = userEvent.setup();
    getRenderedComponent();

    const incrementButton = screen.getByRole("button", {
      name: /increase quantity/i,
    });
    await user.click(incrementButton);

    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it("should call removeFromCart when decrement button is clicked in quantity controls", async () => {
    // Mock cart with item in it
    mockUseCartStore.mockReturnValueOnce({
      cart: {
        items: [{ product: mockProduct, quantity: 2 }],
        total: 59.98,
        itemCount: 2,
      },
      addToCart: mockAddToCart,
      removeFromCart: mockRemoveFromCart,
    });

    const user = userEvent.setup();
    getRenderedComponent();

    const decrementButton = screen.getByRole("button", {
      name: /decrease quantity/i,
    });
    await user.click(decrementButton);

    expect(mockRemoveFromCart).toHaveBeenCalledWith(mockProduct.id);
  });

  it("should format price with two decimal places", () => {
    const productWithOddPrice = { ...mockProduct, price: 15.5 };
    getRenderedComponent({ product: productWithOddPrice });
    expect(screen.getByText("£15.50")).toBeInTheDocument();
  });

  it("should handle zero price correctly", () => {
    const freeProduct = { ...mockProduct, price: 0 };
    getRenderedComponent({ product: freeProduct });
    expect(screen.getByText("£0.00")).toBeInTheDocument();
  });

  it("should render product with long title correctly", () => {
    const longTitleProduct = {
      ...mockProduct,
      title:
        "This is a very long product title that should be truncated with line clamp",
    };
    getRenderedComponent({ product: longTitleProduct });
    expect(screen.getByText(longTitleProduct.title)).toBeInTheDocument();
  });

  it("should render product with long description correctly", () => {
    const longDescProduct = {
      ...mockProduct,
      description:
        "This is a very long product description that should be truncated with line clamp to ensure the card maintains consistent height",
    };
    getRenderedComponent({ product: longDescProduct });
    expect(screen.getByText(longDescProduct.description)).toBeInTheDocument();
  });

  it("should maintain card structure with flex classes", () => {
    const { container } = getRenderedComponent();
    const card = container.querySelector(".h-full.flex.flex-col");
    expect(card).toBeInTheDocument();
  });

  it("should render image with hover scale effect", () => {
    getRenderedComponent();
    const image = screen.getByRole("img", { name: "Test Product" });
    expect(image).toHaveClass("transition-transform", "hover:scale-105");
  });
});
