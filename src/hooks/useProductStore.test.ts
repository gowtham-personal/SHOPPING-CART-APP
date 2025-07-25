import { act, renderHook, waitFor } from '@/test-utils';
import type { Product } from '@/interfaces/product';
import { useProductStore } from './useProductStore';

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock console.error to avoid noise in test output
const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});
afterAll(() => {
  console.error = originalError;
});

// Mock product data for testing
const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Test Product 1',
    price: 29.99,
    description: 'Test description 1',
    category: 'electronics',
    image: 'https://example.com/image1.jpg',
    rating: { rate: 4.5, count: 120 }
  },
  {
    id: 2,
    title: 'Test Product 2',
    price: 49.99,
    description: 'Test description 2',
    category: 'clothing',
    image: 'https://example.com/image2.jpg',
    rating: { rate: 3.8, count: 85 }
  }
];

describe('useProductStore', () => {
  // Helper function to reset store state
  const resetStore = (result: any) => {
    if (result.current) {
      act(() => {
        result.current.setProducts([]);
        result.current.setIsProductsLoading(false);
        result.current.setProductsError('');
      });
    }
  };

  beforeEach(() => {
    // Clear mock calls
    mockFetch.mockClear();
    jest.clearAllMocks();
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useProductStore());
    resetStore(result);

    expect(result.current.products).toEqual([]);
    expect(result.current.isProductsLoading).toBe(false);
    expect(result.current.productsError).toBe('');
  });

  describe('setProducts', () => {
    it('should set products correctly', () => {
      const { result } = renderHook(() => useProductStore());
      resetStore(result);

      act(() => {
        result.current.setProducts(mockProducts);
      });

      expect(result.current.products).toEqual(mockProducts);
      expect(result.current.products).toHaveLength(2);
    });

    it('should replace existing products when setting new products', () => {
      const { result } = renderHook(() => useProductStore());
      resetStore(result);

      const initialProducts = [mockProducts[0]];
      const newProducts = [mockProducts[1]];

      act(() => {
        result.current.setProducts(initialProducts);
      });

      expect(result.current.products).toEqual(initialProducts);

      act(() => {
        result.current.setProducts(newProducts);
      });

      expect(result.current.products).toEqual(newProducts);
      expect(result.current.products).toHaveLength(1);
    });

    it('should handle empty products array', () => {
      const { result } = renderHook(() => useProductStore());
      resetStore(result);

      act(() => {
        result.current.setProducts([]);
      });

      expect(result.current.products).toEqual([]);
      expect(result.current.products).toHaveLength(0);
    });
  });

  describe('setIsProductsLoading', () => {
    it('should set loading state correctly', () => {
      const { result } = renderHook(() => useProductStore());
      resetStore(result);

      act(() => {
        result.current.setIsProductsLoading(true);
      });

      expect(result.current.isProductsLoading).toBe(true);

      act(() => {
        result.current.setIsProductsLoading(false);
      });

      expect(result.current.isProductsLoading).toBe(false);
    });
  });

  describe('setProductsError', () => {
    it('should set error message correctly', () => {
      const { result } = renderHook(() => useProductStore());
      resetStore(result);
      const errorMessage = 'Failed to fetch products';

      act(() => {
        result.current.setProductsError(errorMessage);
      });

      expect(result.current.productsError).toBe(errorMessage);
    });

    it('should clear error message when setting empty string', () => {
      const { result } = renderHook(() => useProductStore());
      resetStore(result);

      act(() => {
        result.current.setProductsError('Some error');
      });

      expect(result.current.productsError).toBe('Some error');

      act(() => {
        result.current.setProductsError('');
      });

      expect(result.current.productsError).toBe('');
    });
  });

  describe('fetchProducts', () => {
    it('should fetch products successfully', async () => {
      const { result } = renderHook(() => useProductStore());
      resetStore(result);

      mockFetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockProducts),
      });

      await act(async () => {
        await result.current.fetchProducts();
      });

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://equalexperts.github.io/frontend-take-home-test-data/products.json'
      );
      expect(result.current.products).toEqual(mockProducts);
      expect(result.current.isProductsLoading).toBe(false);
      expect(result.current.productsError).toBe('');
    });

    it('should set loading state during fetch', async () => {
      const { result } = renderHook(() => useProductStore());
      resetStore(result);

      let resolvePromise: (value: any) => void;
      const fetchPromise = new Promise(resolve => {
        resolvePromise = resolve;
      });

      mockFetch.mockImplementationOnce(() => fetchPromise);

      // Start the fetch
      act(() => {
        result.current.fetchProducts();
      });

      // Check loading state is true immediately after calling fetchProducts
      expect(result.current.isProductsLoading).toBe(true);

      // Resolve the fetch promise
      act(() => {
        resolvePromise({
          json: jest.fn().mockResolvedValueOnce(mockProducts),
        });
      });

      await waitFor(() => {
        expect(result.current.isProductsLoading).toBe(false);
      });
    });

    it('should handle fetch error and set error message', async () => {
      const { result } = renderHook(() => useProductStore());
      resetStore(result);

      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await act(async () => {
        await result.current.fetchProducts();
      });

      expect(result.current.products).toEqual([]);
      expect(result.current.isProductsLoading).toBe(false);
      expect(result.current.productsError).toBe('Error fetching products');
      expect(console.error).toHaveBeenCalledWith('Error fetching products:', expect.any(Error));
    });

    it('should handle JSON parsing error', async () => {
      const { result } = renderHook(() => useProductStore());
      resetStore(result);

      mockFetch.mockResolvedValueOnce({
        json: jest.fn().mockRejectedValueOnce(new Error('Invalid JSON')),
      });

      await act(async () => {
        await result.current.fetchProducts();
      });

      expect(result.current.products).toEqual([]);
      expect(result.current.isProductsLoading).toBe(false);
      expect(result.current.productsError).toBe('Error fetching products');
    });

    it('should not automatically clear error when fetch is successful', async () => {
      const { result } = renderHook(() => useProductStore());
      resetStore(result);

      // Set initial error
      act(() => {
        result.current.setProductsError('Previous error');
      });

      expect(result.current.productsError).toBe('Previous error');

      mockFetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockProducts),
      });

      await act(async () => {
        await result.current.fetchProducts();
      });

      // Error should still be there since fetchProducts doesn't clear it automatically
      expect(result.current.productsError).toBe('Previous error');
      expect(result.current.products).toEqual(mockProducts);
    });

    it('should set loading to false even when fetch fails', async () => {
      const { result } = renderHook(() => useProductStore());
      resetStore(result);

      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await act(async () => {
        await result.current.fetchProducts();
      });

      expect(result.current.isProductsLoading).toBe(false);
    });

    it('should handle empty products array from API', async () => {
      const { result } = renderHook(() => useProductStore());
      resetStore(result);

      mockFetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce([]),
      });

      await act(async () => {
        await result.current.fetchProducts();
      });

      expect(result.current.products).toEqual([]);
      expect(result.current.isProductsLoading).toBe(false);
      expect(result.current.productsError).toBe('');
    });

    it('should handle concurrent fetch calls correctly', async () => {
      const { result } = renderHook(() => useProductStore());
      resetStore(result);

      mockFetch
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValueOnce(mockProducts),
        })
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValueOnce([mockProducts[0]]),
        });

      // Start two concurrent fetches
      const fetchPromise1 = act(async () => {
        await result.current.fetchProducts();
      });

      const fetchPromise2 = act(async () => {
        await result.current.fetchProducts();
      });

      await Promise.all([fetchPromise1, fetchPromise2]);

      expect(mockFetch).toHaveBeenCalledTimes(2);
      expect(result.current.isProductsLoading).toBe(false);
      // The last successful fetch should determine the final state
      expect(result.current.products).toBeDefined();
    });
  });


}); 