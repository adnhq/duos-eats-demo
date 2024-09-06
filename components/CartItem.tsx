// components/CartItem.tsx

import React from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from "lucide-react";
import { CartItem as CartItemType } from "@/lib/types";

type CartItemProps = {
  item: CartItemType;
  onUpdateQuantity: (id: number, change: number) => void;
  onRemove: (id: number) => void;
};

const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => (
  <div className="flex justify-between items-center py-4 border-b">
    <div className="flex-1">
      <h3 className="font-semibold">{item.name}</h3>
      <p className="text-sm text-gray-500">
        Tk {item.price} x {item.quantity}
      </p>
    </div>
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onUpdateQuantity(item.id, -1)}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span>{item.quantity}</span>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onUpdateQuantity(item.id, 1)}
      >
        <Plus className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => onRemove(item.id)}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  </div>
);

export default CartItem;
