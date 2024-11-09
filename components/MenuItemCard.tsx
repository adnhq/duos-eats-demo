"use client";

import React, { useState } from "react";
import { Check, Minus, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Roboto_Slab } from "next/font/google";
import duosLogo from "../duos-lg.png";
import { useAppDispatch } from "@/lib/hooks";
import { addItem } from "@/features/cart/cartSlice";

const priceFont = Roboto_Slab({ subsets: ["latin"], weight: ["400"] });

interface MenuItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    popular: boolean;
    discount: string;
  };
  onAddToCart?: (item: any, quantity: number) => void;
}

export function MenuItemCard({ item, onAddToCart }: MenuItemProps) {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useAppDispatch();

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(prev + change, 0));
  };

  const handleAddToCart = () => {
    const itemToBeAdded = {
      id: item.id,
      name: item.name,
      image: item.image,
      price: priceWithDiscount(Number(item.price), Number(item.discount)),
      quantity,
    };

    dispatch(addItem(itemToBeAdded));
    setQuantity(0);
  };

  const priceWithDiscount = (price: number, discount: number) => {
    return Math.round(price - (price * discount) / 100);
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
              <h3 className={`text-lg ${priceFont.className}`}>{item.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">
                {item.description}
              </p>
            </div>

            <div className="flex items-center justify-between">
              {/* Price Section */}
              <div className={`flex items-center gap-2 ${priceFont.className}`}>
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
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
