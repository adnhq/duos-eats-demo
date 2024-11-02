"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MenuItem } from "@/lib/types";
import { Check } from "lucide-react";
import { Spline_Sans } from "next/font/google";

const splineSans = Spline_Sans({ subsets: ["latin"], weight: ["500"] });

interface MenuCategoryProps {
  category: string;
  items: MenuItem[];
  // onAddToCart: (item: MenuItem, quantity: number) => void;
}

export default function MenuCategory({
  category,
  items,
}: // onAddToCart,
MenuCategoryProps) {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const handleQuantityChange = (itemId: number, change: number) => {
    setQuantities((prev) => {
      const newQuantity = Math.max((prev[itemId] || 0) + change, 0);
      return { ...prev, [itemId]: newQuantity };
    });
  };

  const handleAddToCart = (item: MenuItem) => {
    const quantity = quantities[item.id] || 0;
    if (quantity > 0) {
      // onAddToCart(item, quantity);
      setQuantities((prev) => ({ ...prev, [item.id]: 0 }));
    }
  };

  return (
    <div className="space-y-6">
      <h2 className={`text-2xl font-bold mb-4 ${splineSans.className}`}>
        {category}
      </h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 bg-card rounded-lg shadow-sm"
          >
            <div className="relative w-full sm:w-24 h-48 sm:h-24 flex-shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <div className="flex-grow w-full">
              <h3 className={`${splineSans.className} tracking-wide`}>
                {item.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
              <div className="mt-2 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                <p className="font-semibold">
                  Tk {item.price}
                  {item.originalPrice && (
                    <span className="text-muted-foreground line-through ml-2">
                      Tk {item.originalPrice}
                    </span>
                  )}
                </p>
                <div className="flex items-center justify-between w-full sm:w-auto">
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      size="sm"
                      variant="outline"
                      disabled={!quantities[item.id]}
                      className="h-8 w-8 p-0"
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">
                      {quantities[item.id] || 0}
                    </span>
                    <Button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0"
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    onClick={() => handleAddToCart(item)}
                    size="sm"
                    disabled={!quantities[item.id]}
                    className="h-10 sm:h-auto sm:px-4 w-10 sm:w-auto p-0 sm:p-2 rounded-full sm:rounded-md ml-4 sm:ml-2"
                  >
                    <span className="hidden sm:inline">Add to Cart</span>
                    <Check className="inline sm:hidden h-6 w-6" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
