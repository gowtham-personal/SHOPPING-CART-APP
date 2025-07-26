import ProductList from "@/components/product/ProductList";
import { useCartStore } from "@/hooks/useCartStore";
import { useProductStore } from "@/hooks/useProductStore";
import type { Product } from "@/interfaces/product";
import { render, screen } from "@/test-utils";

// Mock the hooks
jest.mock("@/hooks/useProductStore", () => ({
  useProductStore: jest.fn(),
}));
jest.mock("@/hooks/useCartStore", () => ({
  useCartStore: jest.fn(),
}));

const mockUseProductStore = useProductStore as jest.MockedFunction<
  typeof useProductStore
>;
const mockUseCartStore = useCartStore as jest.MockedFunction<
  typeof useCartStore
>;

const mockProducts = require("@/test-utils/mock/mockProducts.json");

describe("ProductList", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Default cart store mock
    mockUseCartStore.mockReturnValue({
      cart: {
        items: [],
      },
      addToCart: jest.fn(),
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

      mockProducts.forEach((product: Product) => {
        expect(
          screen.getByTestId(`product-card-${product.id}`),
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

      mockProducts.forEach((product: Product) => {
        // Verify product data is displayed
        expect(
          screen.getByTestId(`product-card-${product.id}`),
        ).toBeInTheDocument();
      });
    });

    it("should call addToCart when Add to Cart button is clicked on a product", () => {
      render(<ProductList />);

      const firstProductAddButton = screen.getAllByText("Add to Cart")[0];
      firstProductAddButton.click();

      expect(mockUseCartStore().addToCart).toHaveBeenCalledTimes(1);
      expect(mockUseCartStore().addToCart).toHaveBeenCalledWith(
        mockProducts[0],
      );
    });

    it("should call addToCart with correct product when different products Add to Cart buttons are clicked", () => {
      render(<ProductList />);

      const addToCartButtons = screen.getAllByText("Add to Cart");

      // Click second product's add to cart button
      addToCartButtons[1].click();

      expect(mockUseCartStore().addToCart).toHaveBeenCalledTimes(1);
      expect(mockUseCartStore().addToCart).toHaveBeenCalledWith(
        mockProducts[1],
      );
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

      expect(screen.getByText(singleProduct[0].title)).toBeInTheDocument();
      expect(
        screen.getByText(singleProduct[0].description),
      ).toBeInTheDocument();
      expect(
        screen.getByText(`£${singleProduct[0].price.toFixed(2)}`),
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

      expect(screen.getByText(edgeCaseProducts[0].title)).toBeInTheDocument();
      expect(screen.getByText("£0.01")).toBeInTheDocument();
    });
  });
});
