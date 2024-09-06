// components/MenuItem.tsx

import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { MenuItem as MenuItemType } from "@/lib/types";

type MenuItemProps = {
  item: MenuItemType;
  onAddToCart: (item: MenuItemType) => void;
};

const MenuItem: React.FC<MenuItemProps> = ({ item, onAddToCart }) => (
  <div className="flex justify-between items-start border-b last:border-none py-4">
    <div className="flex-1">
      <h3 className="font-semibold">{item.name}</h3>
      <p className="text-sm text-gray-500">{item.description}</p>
      <div className="mt-1">
        <span className="font-semibold">from Tk {item.price}</span>
        {item.originalPrice && (
          <span className="text-sm text-gray-500 line-through ml-2">
            Tk {item.originalPrice}
          </span>
        )}
      </div>
    </div>
    <div className="flex items-center gap-4">
      <img src={item.image} alt={item.name} className="rounded-md w-20 h-20" />
      <Button variant="outline" size="icon" onClick={() => onAddToCart(item)}>
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  </div>
);

export default MenuItem;
