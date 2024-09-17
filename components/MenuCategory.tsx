// components/MenuCategory.tsx

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MenuItem } from "@/lib/types";

interface MenuCategoryProps {
  category: string;
  items: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
}

export default function MenuCategory({ category, items, onAddToCart }: MenuCategoryProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">{category}</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-4 p-4 bg-card rounded-lg shadow-sm">
            <div className="relative w-24 h-24 flex-shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <div className="flex-grow">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
              <div className="mt-2 flex justify-between items-center">
                <p className="font-semibold">
                  Tk {item.price}
                  {item.originalPrice && (
                    <span className="text-muted-foreground line-through ml-2">
                      Tk {item.originalPrice}
                    </span>
                  )}
                </p>
                <Button onClick={() => onAddToCart(item)} size="sm">
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}