// components/RestaurantCard.tsx

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Utensils } from "lucide-react";
import Link from "next/link";

type RestaurantCardProps = {
  restaurant: {
    id: number;
    name: string;
    image: string;
    rating: number;
    deliveryTime: string;
    cuisine: string;
    category: string;
  };
};

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => (
  <Link href="/menu">
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-0 relative overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
        <Badge className="absolute top-2 right-2 bg-black/50 text-white">
          {restaurant.category}
        </Badge>
      </CardContent>
      <CardHeader>
        <CardTitle className="text-lg font-bold">{restaurant.name}</CardTitle>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            {restaurant.rating}
          </span>
          <span>•</span>
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {restaurant.deliveryTime}
          </span>
        </div>
      </CardHeader>
      <CardFooter className="bg-gray-50 px-6 py-3">
        <div className="flex items-center text-sm text-gray-600">
          <Utensils className="w-4 h-4 mr-2" />
          {restaurant.cuisine}
        </div>
      </CardFooter>
    </Card>
  </Link>
);

export default RestaurantCard;
