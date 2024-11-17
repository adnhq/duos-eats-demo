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
    <div className="grid grid-cols-[auto_1fr] py-4 border-b gap-4">
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

      <div></div>

      <div className="flex items-center gap-2 ml-auto">
        <Button
          variant="outline"
          size="icon"
          onClick={() => dispatch(decreaseItemQuantity(`${item.identifier}`))}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span>{item.quantity}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => dispatch(increaseItemQuantity(`${item.identifier}`))}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => dispatch(deleteItem(`${item.identifier}`))}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
