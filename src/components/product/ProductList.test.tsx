import type { Product } from "@/interfaces/product";
import { render, screen } from "@/test-utils";

import ProductList from "./ProductList";

// Mock the hooks
jest.mock("@/hooks/useProductStore");
jest.mock("@/hooks/useCartStore");

// Mock the child components
jest.mock("./ProductCard", () => {
  return function MockProductCard({
    product,
    onAddToCart,
  }: {
    product: Product;
    onAddToCart: (product: Product) => void;
  }) {
    return (
      <div data-testid={`product-card-${product.id}`}>
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <span>£{product.price.toFixed(2)}</span>
        <button onClick={() => onAddToCart(product)}>Add to Cart</button>
      </div>
    );
  };
});

jest.mock("./ProductSkeleton", () => {
  return function MockProductSkeleton() {
    return <div data-testid="product-skeleton">Loading...</div>;
  };
});

const mockUseProductStore = require("@/hooks/useProductStore")
  .useProductStore as jest.MockedFunction<any>;
const mockUseCartStore = require("@/hooks/useCartStore")
  .useCartStore as jest.MockedFunction<any>;

const mockProducts: Product[] = [
  {
    id: 1,
    title: "Test Product 1",
    price: 29.99,
    description: "Test description 1",
    category: "electronics",
    image: "https://example.com/image1.jpg",
    rating: { rate: 4.5, count: 120 },
  },
  {
    id: 2,
    title: "Test Product 2",
    price: 49.99,
    description: "Test description 2",
    category: "clothing",
    image: "https://example.com/image2.jpg",
    rating: { rate: 3.8, count: 85 },
  },
];

const mockAddToCart = jest.fn();

describe("ProductList", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Default cart store mock
    mockUseCartStore.mockReturnValue({
      addToCart: mockAddToCart,
    });
  });

  describe("Loading state", () => {
    it("should render skeleton loading components when products are loading", () => {
      mockUseProductStore.mockReturnValue({
        products: [],
        isProductsLoading: true,
      });

      render(<ProductList />);

      const skeletons = screen.getAllByTestId("product-skeleton");
      expect(skeletons).toHaveLength(8);

      const loadingTexts = screen.getAllByText("Loading...");
      expect(loadingTexts).toHaveLength(8);
    });

    it("should render multiple skeleton components in correct grid layout when loading", () => {
      mockUseProductStore.mockReturnValue({
        products: [],
        isProductsLoading: true,
      });

      const { container } = render(<ProductList />);

      const gridContainer = container.querySelector(".grid");
      expect(gridContainer).toHaveClass(
        "grid-cols-1",
        "sm:grid-cols-2",
        "lg:grid-cols-3",
        "xl:grid-cols-4",
        "gap-6",
      );
    });
  });

  describe("Empty state", () => {
    it("should render empty state message when no products are found and not loading", () => {
      mockUseProductStore.mockReturnValue({
        products: [],
        isProductsLoading: false,
      });

      render(<ProductList />);

      expect(screen.getByText("No products found.")).toBeInTheDocument();
      expect(screen.queryByTestId("product-skeleton")).not.toBeInTheDocument();
    });

    it("should render empty state with correct styling and layout", () => {
      mockUseProductStore.mockReturnValue({
        products: [],
        isProductsLoading: false,
      });

      const { container } = render(<ProductList />);

      const emptyStateContainer = container.querySelector(".text-center.py-12");
      expect(emptyStateContainer).toBeInTheDocument();

      const message = screen.getByText("No products found.");
      expect(message).toHaveClass("text-gray-500", "text-lg");
    });
  });

  describe("Products loaded state", () => {
    beforeEach(() => {
      mockUseProductStore.mockReturnValue({
        products: mockProducts,
        isProductsLoading: false,
      });
    });

    it("should render all products when products are loaded", () => {
      render(<ProductList />);

      mockProducts.forEach((product) => {
        expect(
          screen.getByTestId(`product-card-${product.id}`),
        ).toBeInTheDocument();
        expect(screen.getByText(product.title)).toBeInTheDocument();
        expect(screen.getByText(product.description)).toBeInTheDocument();
        expect(
          screen.getByText(`£${product.price.toFixed(2)}`),
        ).toBeInTheDocument();
      });
    });

    it("should render products in correct grid layout", () => {
      const { container } = render(<ProductList />);

      const gridContainer = container.querySelector(".grid");
      expect(gridContainer).toHaveClass(
        "grid-cols-1",
        "sm:grid-cols-2",
        "lg:grid-cols-3",
        "xl:grid-cols-4",
        "gap-6",
      );
    });

    it("should pass correct props to each ProductCard component", () => {
      render(<ProductList />);

      mockProducts.forEach((product) => {
        const productCard = screen.getByTestId(`product-card-${product.id}`);
        expect(productCard).toBeInTheDocument();

        // Verify product data is displayed
        expect(screen.getByText(product.title)).toBeInTheDocument();
        expect(screen.getByText(product.description)).toBeInTheDocument();
        expect(
          screen.getByText(`£${product.price.toFixed(2)}`),
        ).toBeInTheDocument();
      });
    });

    it("should call addToCart when Add to Cart button is clicked on a product", () => {
      render(<ProductList />);

      const firstProductAddButton = screen.getAllByText("Add to Cart")[0];
      firstProductAddButton.click();

      expect(mockAddToCart).toHaveBeenCalledTimes(1);
      expect(mockAddToCart).toHaveBeenCalledWith(mockProducts[0]);
    });

    it("should call addToCart with correct product when different products Add to Cart buttons are clicked", () => {
      render(<ProductList />);

      const addToCartButtons = screen.getAllByText("Add to Cart");

      // Click second product's add to cart button
      addToCartButtons[1].click();

      expect(mockAddToCart).toHaveBeenCalledTimes(1);
      expect(mockAddToCart).toHaveBeenCalledWith(mockProducts[1]);
    });
  });

  describe("Hook integration", () => {
    it("should use useProductStore hook to get products and loading state", () => {
      mockUseProductStore.mockReturnValue({
        products: mockProducts,
        isProductsLoading: false,
      });

      render(<ProductList />);

      expect(mockUseProductStore).toHaveBeenCalledTimes(1);
    });

    it("should use useCartStore hook to get addToCart function", () => {
      mockUseProductStore.mockReturnValue({
        products: mockProducts,
        isProductsLoading: false,
      });

      render(<ProductList />);

      expect(mockUseCartStore).toHaveBeenCalledTimes(1);
    });
  });

  describe("Edge cases", () => {
    it("should handle single product correctly", () => {
      const singleProduct = [mockProducts[0]];
      mockUseProductStore.mockReturnValue({
        products: singleProduct,
        isProductsLoading: false,
      });

      render(<ProductList />);

      expect(
        screen.getByTestId(`product-card-${singleProduct[0].id}`),
      ).toBeInTheDocument();
      expect(screen.queryByText("No products found.")).not.toBeInTheDocument();
      expect(screen.queryByTestId("product-skeleton")).not.toBeInTheDocument();
    });

    it("should handle products with edge case data", () => {
      const edgeCaseProducts: Product[] = [
        {
          id: 999,
          title:
            "Product with very long title that might wrap to multiple lines",
          price: 0.01,
          description: "Very short desc",
          category: "test",
          image: "https://example.com/image.jpg",
          rating: { rate: 0, count: 0 },
        },
      ];

      mockUseProductStore.mockReturnValue({
        products: edgeCaseProducts,
        isProductsLoading: false,
      });

      render(<ProductList />);

      expect(
        screen.getByTestId(`product-card-${edgeCaseProducts[0].id}`),
      ).toBeInTheDocument();
      expect(screen.getByText(edgeCaseProducts[0].title)).toBeInTheDocument();
      expect(screen.getByText("£0.01")).toBeInTheDocument();
    });
  });
});
