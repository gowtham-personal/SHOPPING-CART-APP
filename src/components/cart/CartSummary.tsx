import { ShoppingCart, Trash2 } from "lucide-react";

import { Button, Card, Icon, Text } from "@/components/bricks";
import { useCartStore } from "@/hooks/useCartStore";

import QuantityControls from "./QuantityControls";

const CartSummary = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCartStore();

  const formatPrice = (price: number) => {
    return `£${price.toFixed(2)}`;
  };

  if (cart.items.length === 0) {
    return (
      <Card>
        <Card.Content>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <ShoppingCart className="h-12 w-12 text-gray-400 mb-4" />
            <Text
              text="Your cart is empty"
              size="lg"
              weight="medium"
              color="black"
              className="mb-2"
            />
            <Text
              text="Start shopping to add items to your cart"
              color="grey"
            />
          </div>
        </Card.Content>
      </Card>
    );
  }

  return (
    <Card>
      <Card.Header>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon icon={ShoppingCart} size="lg" />
            <Text
              text={`Shopping Cart (${cart.itemCount} items)`}
              size="xl"
              weight="semibold"
              color="black"
            />
          </div>
          <div className="flex items-center gap-2">
            <Icon icon={Trash2} size="sm" onClick={clearCart} />
          </div>
        </div>
      </Card.Header>

      <Card.Content>
        <div className="flex flex-col gap-1">
          {cart.items.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center justify-between space-x-4 py-4"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="h-10 w-10 object-contain rounded-md border"
                />

                <div className="flex flex-col md:flex-row gap-2">
                  <Text
                    text={item.product.title}
                    size="sm"
                    weight="medium"
                    color="black"
                    className="line-clamp-2"
                  />
                  <Text
                    text={`(${formatPrice(item.product.price)} each)`}
                    size="sm"
                    color="grey"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <QuantityControls
                  quantity={item.quantity}
                  onIncrement={() => addToCart(item.product)}
                  onDecrement={() => removeFromCart(item.product.id)}
                />

                <div className="text-right min-w-[4rem]">
                  <Text
                    text={formatPrice(item.product.price * item.quantity)}
                    size="sm"
                    weight="medium"
                    color="black"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card.Content>

      <Card.Footer className="border-t">
        <div className="flex justify-between items-center text-lg font-semibold w-full">
          <div className="flex w-50">
            <Button
              variant="solid"
              size="sm"
              color="blue"
              text="Proceed to Checkout"
            />
          </div>
          <div className="flex items-center gap-2 justify-end w-full">
            <Text text="Total:" size="lg" weight="semibold" color="black" />
            <Text
              text={formatPrice(cart.total)}
              size="lg"
              weight="semibold"
              color="blue"
            />
          </div>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default CartSummary;
