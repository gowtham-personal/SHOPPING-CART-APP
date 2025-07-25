import { act, renderHook } from '@/test-utils';
import type { Product } from '@/interfaces/product';
import { useCartStore } from './useCartStore';

// Mock product data for testing
const mockProduct1: Product = {
  id: 1,
  title: 'Test Product 1',
  price: 29.99,
  description: 'Test description 1',
  category: 'electronics',
  image: 'https://example.com/image1.jpg',
  rating: { rate: 4.5, count: 120 }
};

const mockProduct2: Product = {
  id: 2,
  title: 'Test Product 2',
  price: 49.99,
  description: 'Test description 2',
  category: 'clothing',
  image: 'https://example.com/image2.jpg',
  rating: { rate: 3.8, count: 85 }
};

describe('useCartStore', () => {
  beforeEach(() => {
    // Reset the store before each test
    const { result } = renderHook(() => useCartStore());
    act(() => {
      result.current.clearCart();
      result.current.setShowCart(false);
    });
  });

  it('should initialize with empty cart state', () => {
    const { result } = renderHook(() => useCartStore());

    expect(result.current.cart.items).toEqual([]);
    expect(result.current.cart.total).toBe(0);
    expect(result.current.cart.itemCount).toBe(0);
    expect(result.current.showCart).toBe(false);
  });

  describe('addToCart', () => {
    it('should add a new product to empty cart', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(mockProduct1);
      });

      expect(result.current.cart.items).toHaveLength(1);
      expect(result.current.cart.items[0].product.id).toBe(mockProduct1.id);
      expect(result.current.cart.items[0].quantity).toBe(1);
      expect(result.current.cart.total).toBe(29.99);
      expect(result.current.cart.itemCount).toBe(1);
    });

    it('should increment quantity when adding existing product', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(mockProduct1);
        result.current.addToCart(mockProduct1);
      });

      expect(result.current.cart.items).toHaveLength(1);
      expect(result.current.cart.items[0].quantity).toBe(2);
      expect(result.current.cart.total).toBe(59.98);
      expect(result.current.cart.itemCount).toBe(2);
    });

    it('should add multiple different products to cart', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(mockProduct1);
        result.current.addToCart(mockProduct2);
      });

      expect(result.current.cart.items).toHaveLength(2);
      expect(result.current.cart.items[0].product.id).toBe(mockProduct1.id);
      expect(result.current.cart.items[1].product.id).toBe(mockProduct2.id);
      expect(result.current.cart.total).toBe(79.98);
      expect(result.current.cart.itemCount).toBe(2);
    });

    it('should calculate correct totals with multiple products and quantities', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(mockProduct1); // 29.99 x 1 = 29.99
        result.current.addToCart(mockProduct1); // 29.99 x 2 = 59.98
        result.current.addToCart(mockProduct2); // 49.99 x 1 = 49.99
        result.current.addToCart(mockProduct2); // 49.99 x 2 = 99.98
        result.current.addToCart(mockProduct2); // 49.99 x 3 = 149.97
      });

      expect(result.current.cart.items).toHaveLength(2);
      expect(result.current.cart.items[0].quantity).toBe(2);
      expect(result.current.cart.items[1].quantity).toBe(3);
      expect(result.current.cart.total).toBe(209.95); // 59.98 + 149.97
      expect(result.current.cart.itemCount).toBe(5);
    });
  });

  describe('removeFromCart', () => {
    it('should decrease quantity when removing product with quantity > 1', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(mockProduct1);
        result.current.addToCart(mockProduct1);
        result.current.addToCart(mockProduct1); // quantity = 3
      });

      act(() => {
        result.current.removeFromCart(mockProduct1.id);
      });

      expect(result.current.cart.items).toHaveLength(1);
      expect(result.current.cart.items[0].quantity).toBe(2);
      expect(result.current.cart.total).toBe(59.98);
      expect(result.current.cart.itemCount).toBe(2);
    });

    it('should remove product entirely when removing product with quantity = 1', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(mockProduct1);
      });

      act(() => {
        result.current.removeFromCart(mockProduct1.id);
      });

      expect(result.current.cart.items).toHaveLength(0);
      expect(result.current.cart.total).toBe(0);
      expect(result.current.cart.itemCount).toBe(0);
    });

    it('should only affect the specific product when removing from cart with multiple products', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(mockProduct1);
        result.current.addToCart(mockProduct1); // quantity = 2
        result.current.addToCart(mockProduct2); // quantity = 1
      });

      act(() => {
        result.current.removeFromCart(mockProduct1.id);
      });

      expect(result.current.cart.items).toHaveLength(2);
      expect(result.current.cart.items[0].quantity).toBe(1); // mockProduct1 quantity decreased
      expect(result.current.cart.items[1].quantity).toBe(1); // mockProduct2 unchanged
      expect(result.current.cart.total).toBe(79.98); // 29.99 + 49.99
      expect(result.current.cart.itemCount).toBe(2);
    });

    it('should handle removing non-existent product gracefully', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(mockProduct1);
      });

      act(() => {
        result.current.removeFromCart(999); // non-existent product ID
      });

      expect(result.current.cart.items).toHaveLength(1);
      expect(result.current.cart.items[0].quantity).toBe(1);
      expect(result.current.cart.total).toBe(29.99);
      expect(result.current.cart.itemCount).toBe(1);
    });
  });

  describe('clearCart', () => {
    it('should reset cart to empty state', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(mockProduct1);
        result.current.addToCart(mockProduct2);
        result.current.addToCart(mockProduct1);
      });

      act(() => {
        result.current.clearCart();
      });

      expect(result.current.cart.items).toEqual([]);
      expect(result.current.cart.total).toBe(0);
      expect(result.current.cart.itemCount).toBe(0);
    });

    it('should not affect showCart state when clearing cart', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.setShowCart(true);
        result.current.addToCart(mockProduct1);
      });

      act(() => {
        result.current.clearCart();
      });

      expect(result.current.showCart).toBe(true);
      expect(result.current.cart.items).toEqual([]);
    });
  });

  describe('showCart functionality', () => {
    it('should toggle showCart state correctly', () => {
      const { result } = renderHook(() => useCartStore());

      expect(result.current.showCart).toBe(false);

      act(() => {
        result.current.setShowCart(true);
      });

      expect(result.current.showCart).toBe(true);

      act(() => {
        result.current.setShowCart(false);
      });

      expect(result.current.showCart).toBe(false);
    });
  });

  describe('setCart', () => {
    it('should set cart state directly', () => {
      const { result } = renderHook(() => useCartStore());

      const customCart = {
        items: [
          { product: mockProduct1, quantity: 3 },
          { product: mockProduct2, quantity: 1 }
        ],
        total: 139.96, // 29.99 * 3 + 49.99 * 1
        itemCount: 4
      };

      act(() => {
        result.current.setCart(customCart);
      });

      expect(result.current.cart).toEqual(customCart);
    });
  });

  describe('edge cases', () => {
    it('should handle products with zero price', () => {
      const freeProduct: Product = {
        ...mockProduct1,
        id: 3,
        price: 0
      };

      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(freeProduct);
        result.current.addToCart(freeProduct);
      });

      expect(result.current.cart.items[0].quantity).toBe(2);
      expect(result.current.cart.total).toBe(0);
      expect(result.current.cart.itemCount).toBe(2);
    });

    it('should handle products with decimal prices correctly', () => {
      const decimalProduct: Product = {
        ...mockProduct1,
        id: 4,
        price: 19.99
      };

      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(decimalProduct);
        result.current.addToCart(decimalProduct);
        result.current.addToCart(decimalProduct);
      });

      expect(result.current.cart.total).toBe(59.97);
      expect(result.current.cart.itemCount).toBe(3);
    });
  });
}); 