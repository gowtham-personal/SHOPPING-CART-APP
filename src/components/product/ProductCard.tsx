import { Plus } from 'lucide-react';
import type { Product } from '@/interfaces/product';
import { Card, Button, StarRating, Text } from '@/components/bricks';
import { useCartStore } from '@/hooks/useCartStore';
import QuantityControls from '../cart/QuantityControls';

export interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { id, title, price, description, image, rating } = product;
  const { cart, addToCart, removeFromCart } = useCartStore();

  const formatPrice = (price: number) => {
    return `£${price.toFixed(2)}`;
  };

  const checkItemInCart = (id: number) => {
    return cart.items.some((item: { product: Product; quantity: number }) => item.product.id === id);
  };

  const getItemQuantity = (id: number) => {
    const item = cart.items.find((item: { product: Product; quantity: number }) => item.product.id === id);
    return item ? item.quantity : 0;
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(id);
  };

  const isInCart = checkItemInCart(id);
  const quantity = getItemQuantity(id);

  return (
    <Card className="h-full flex flex-col">
      <Card.Header className="pb-4">
        <div className="aspect-square overflow-hidden rounded-md h-40">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-contain transition-transform hover:scale-105"
            loading="lazy"
          />
        </div>
      </Card.Header>

      <Card.Content className="flex-1 flex flex-col gap-2">
        <Text
          text={title}
          size="lg"
          weight="semibold"
          color="black"
          className="line-clamp-2"
        />

        <StarRating
          rating={rating.rate}
          showCount={true}
          count={rating.count}
        />

        <Text
          text={description}
          size="sm"
          weight="normal"
          color="grey"
          className="line-clamp-3"
        />

        <Text
          text={formatPrice(price)}
          size="lg"
          weight="semibold"
          color="blue"
        />
        <div className="mt-auto">
          {isInCart ? (
            <QuantityControls
              quantity={quantity}
              onIncrement={handleAddToCart}
              onDecrement={handleRemoveFromCart}
            />
          ) : (
            <Button
              onClick={handleAddToCart}
              className="w-full"
              text="Add to Cart"
              leftIcon={<Plus className="h-4 w-4" aria-hidden="true" />}
              aria-label={`Add ${title} to cart`}
            />
          )}
        </div>
      </Card.Content>
    </Card>
  );
};

export default ProductCard; 