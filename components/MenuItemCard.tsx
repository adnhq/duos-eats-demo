"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { addItem, prevResturantId } from "@/features/cart/cartSlice";
import { useToast } from "@/hooks/use-toast";
import { priceWithDiscount } from "@/lib/helper";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Cart, CartItemType, MenuItem } from "@/lib/types";
import { Check, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import duosLogo from "../duos-lg.png";
import ItemExtraParamForm from "./ItemExtraParamForm";

type MenuItemProps = {
  item: MenuItem;
};

export function MenuItemCard({ item }: MenuItemProps) {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useAppDispatch();
  const prevRestaurantId = useAppSelector(prevResturantId);
  const { toast } = useToast();

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(prev + change, 0));
  };

  const handleAddToCart = () => {
    if (prevRestaurantId !== null && prevRestaurantId !== item.restaurantId) {
      toast({
        title: "Sorry, could not add the item to cart.",
        description:
          "You have items from a different restaurant in the cart. Please clear the cart to add items from this restaurant.",
        variant: "destructive",
      });
      return;
    }

    const itemToBeAdded: CartItemType & Partial<Cart> = {
      id: item.id,
      identifier: `${item.id}`,
      name: item.name,
      image: item.image === "undefined" ? duosLogo.src : item.image,
      actualPrice: Number(item.price),
      priceAfterDiscount: priceWithDiscount(item.price, Number(item.discount)),
      quantity,
      restaurantId: item.restaurantId,
      discount: Number(item.discount),
    };

    dispatch(addItem(itemToBeAdded));
    toast({
      title: "Item added to cart",
      description: "You can view and edit your cart from the cart page.",
    });
    setQuantity(0);
  };

  return (
    <Card className="group overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Image Container */}
          <div className="relative w-full h-48 sm:w-24 sm:h-24">
            <Image
              src={item.image === "undefined" ? duosLogo : item.image}
              alt={item.name}
              fill
              className="rounded-md object-cover"
            />
          </div>

          {/* Content Container */}
          <div className="flex-1 space-y-2">
            <div>
              <h3 className={`text-lg font-semibold`}>{item.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">
                {item.description}
              </p>
            </div>

            <div className="flex items-center justify-between">
              {/* Price Section */}
              <div className={`flex items-center gap-2 `}>
                {Number(item.discount) > 0 ? (
                  <>
                    <span className="font-semibold">
                      Tk {priceWithDiscount(item.price, Number(item.discount))}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      Tk {Math.round(item.price)}
                    </span>
                  </>
                ) : (
                  <span className="font-semibold">
                    Tk {Math.round(item.price)}
                  </span>
                )}
              </div>

              {/* Quantity Controls and Add to Cart */}
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-gray-100 rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={!quantity}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-8 text-center text-sm">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {item.MenuParameters?.length === 0 ? (
                  <Button
                    onClick={handleAddToCart}
                    disabled={!quantity}
                    size="sm"
                    variant="default"
                    className="w-10 sm:w-auto"
                  >
                    <Check className="w-4 h-4 sm:hidden" />
                    <span className="hidden sm:inline">Add to Cart</span>
                  </Button>
                ) : (
                  <ItemExtraParamForm
                    item={item}
                    quantity={quantity}
                    setQuantity={setQuantity}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
