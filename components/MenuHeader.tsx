// components/RestaurantHeader.tsx

import React from "react";
import { Star, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RestaurantData } from "@/lib/types";

type MenuHeaderProps = {
  restaurantData: RestaurantData;
};

const MenuHeader: React.FC<MenuHeaderProps> = ({ restaurantData }) => (
  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-6">
    <img
      src={restaurantData.menu.Popular[0].image}
      alt={restaurantData.name}
      className="rounded-lg w-40 h-40"
    />
    <div>
      <h1 className="text-2xl font-bold">{restaurantData.name}</h1>
      <p className="text-gray-500">{restaurantData.category}</p>
      <div className="flex items-center gap-2 mt-2">
        <span className="flex items-center">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          {restaurantData.rating}
        </span>
        <Button variant="link" className="p-0 h-auto">
          See reviews
        </Button>
        <Button variant="link" className="p-0 h-auto">
          <Info className="w-4 h-4 mr-1" />
          More info
        </Button>
      </div>
      <div className="mt-2">
        {restaurantData.freeDelivery && (
          <span className="text-green-600 font-semibold mr-2">
            Free delivery
          </span>
        )}
        <span>Min. order Tk {restaurantData.minOrder}</span>
      </div>
    </div>
  </div>
);

export default MenuHeader;
