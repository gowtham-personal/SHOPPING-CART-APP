import { Minus, Plus, Trash2 } from "lucide-react";

import { Button, Icon, Text } from "@/components/bricks";

interface QuantityControlsProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const QuantityControls = ({
  quantity,
  onIncrement,
  onDecrement,
}: QuantityControlsProps) => {
  return (
    <div className="flex items-center gap-1">
      {/* Decrement Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={onDecrement}
        leftIcon={
          quantity > 1 ? (
            <Icon icon={Minus} size="sm" />
          ) : (
            <Icon icon={Trash2} size="sm" />
          )
        }
        className="h-8 w-8 p-0"
      />

      {/* Quantity Text */}
      <Text
        text={quantity.toString()}
        size="sm"
        weight="medium"
        color="black"
        className="min-w-[2rem] text-center"
      />

      {/* Increment Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={onIncrement}
        leftIcon={<Icon icon={Plus} size="sm" />}
        className="h-8 w-8 p-0"
      />
    </div>
  );
};

export default QuantityControls;
