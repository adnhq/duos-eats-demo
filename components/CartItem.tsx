// components/CartItem.tsx

import { Button } from "@/components/ui/button";
import {
  decreaseItemQuantity,
  deleteItem,
  increaseItemQuantity,
} from "@/features/cart/cartSlice";
import { useAppDispatch } from "@/lib/hooks";
import { CartItemType } from "@/lib/types";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";

type CartItemProps = {
  item: CartItemType;
};

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex justify-between items-center py-4 border-b">
      <div className="flex-1">
        <div className="flex gap-2 items-center">
          <div className="w-16 h-16 relative">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover rounded-md"
            />
          </div>

          <div>
            <h3 className="font-semibold">{item.name}</h3>
            <div className="text-sm text-gray-500">
              {item?.extraParams?.map((extraParam, idx) => (
                <p key={idx}>{`${extraParam.split(":")[0]}-${
                  extraParam.split(":")[1]
                }`}</p>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              Tk {item.priceAfterDiscount} x {item.quantity}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => dispatch(decreaseItemQuantity(`${item.id}`))}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span>{item.quantity}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => dispatch(increaseItemQuantity(`${item.id}`))}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => dispatch(deleteItem(`${item.id}`))}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
