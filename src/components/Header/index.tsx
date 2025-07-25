import { ShoppingCart } from 'lucide-react';
import { Button, Text } from '../bricks';
import { useCartStore } from '@/hooks/useCartStore';

const Header = () => {
  const { cart, showCart, setShowCart } = useCartStore();

  return (
    <div className="bg-white shadow-sm border-b sticky top-0 z-10">
      <div className="w-full px-3 py-1">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center gap-3">
            <img src="/equal_experts_logo.jpeg" alt="Product Store" className="h-10 w-10" />
            <Text text="Product Store" size="xl" weight="bold" color="black" />
          </div>

          {/* Cart Button */}
          <div className="flex items-center">
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setShowCart(!showCart)}
                text={showCart ? "Hide Cart" : "View Cart"}
                leftIcon={<ShoppingCart className="h-5 w-5" />}
                className="relative"
                aria-label={`Shopping cart with ${cart.itemCount} items`}
              />
              
              {/* Cart Badge */}
              {cart.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-sky-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-medium">
                  {cart.itemCount > 99 ? '99+' : cart.itemCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header; 