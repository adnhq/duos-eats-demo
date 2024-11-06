"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Spline_Sans } from "next/font/google";
import { Card } from "./ui/card";
import { priceWithDiscount } from "@/lib/helper";

const splineSans = Spline_Sans({ subsets: ["latin"], weight: ["500"] });

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

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(prev + change, 0));
  };

  const handleAddToCart = () => {
    if (quantity > 0 && onAddToCart) {
      onAddToCart(item, quantity);
      setQuantity(0);
    }
  };

  return (
    <Card className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 rounded-lg shadow-sm">
      <div className="relative w-full sm:w-24 h-48 sm:h-24 flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="rounded-md object-cover"
        />
      </div>
      <div className="flex-grow w-full">
        <h3 className={`${splineSans.className} tracking-wide`}>{item.name}</h3>
        <p className="text-sm text-muted-foreground">{item.description}</p>
        <div className="mt-2 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
          <div className="flex gap-2">
            <p className="font-semibold line-through text-muted-foreground">
              Tk {item.price}
            </p>
            <p className="font-semibold">
              Tk {priceWithDiscount(Number(item.price), Number(item.discount))}
            </p>
          </div>
          <div className="flex items-center justify-between w-full sm:w-auto">
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => handleQuantityChange(-1)}
                size="sm"
                variant="outline"
                disabled={!quantity}
                className="h-8 w-8 p-0"
              >
                -
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button
                onClick={() => handleQuantityChange(1)}
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0"
              >
                +
              </Button>
            </div>
            <Button
              onClick={handleAddToCart}
              size="sm"
              disabled={!quantity}
              className="h-10 sm:h-auto sm:px-4 w-10 sm:w-auto p-0 sm:p-2 rounded-full sm:rounded-md ml-4 sm:ml-2"
            >
              <span className="hidden sm:inline">Add to Cart</span>
              <Check className="inline sm:hidden h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
