// components/MenuCategory.tsx

import React from "react";
import MenuItem from "./MenuItem";
import { MenuItem as MenuItemType } from "@/lib/types";

type MenuCategoryProps = {
  category: string;
  items: MenuItemType[];
  onAddToCart: (item: MenuItemType) => void;
};

const MenuCategory: React.FC<MenuCategoryProps> = ({
  category,
  items,
  onAddToCart,
}) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">{category}</h2>

    {items.map((item) => (
      <MenuItem key={item.id} item={item} onAddToCart={onAddToCart} />
    ))}
  </div>
);

export default MenuCategory;
