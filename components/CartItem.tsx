// components/CartItem.tsx

import React from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from "lucide-react";
import { CartItemType } from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  decreaseItemQuantity,
  deleteItem,
  getItemQuantityById,
  increaseItemQuantity,
} from "@/features/cart/cartSlice";

type CartItemProps = {
  item: CartItemType;
  // onUpdateQuantity: (id: number, change: number) => void;
  // onRemove: (id: number) => void;
};

const CartItem: React.FC<CartItemProps> = ({
  item,
  // onUpdateQuantity,
  // onRemove,
}) => {
  const dispatch = useAppDispatch();
  // const itemQuantity = useAppSelector(() => getItemQuantityById(item.id));

  return (
    <div className="flex justify-between items-center py-4 border-b">
      <div className="flex-1">
        <div className="flex gap-2 items-center">
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 rounded-md"
          />

          <div>
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-500">
              Tk {item.price} x {item.quantity}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => dispatch(decreaseItemQuantity(item.id))}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span>{item.quantity}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => dispatch(increaseItemQuantity(item.id))}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => dispatch(deleteItem(item.id))}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
