"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Restaurant } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";

export default function RestaurantSelector({
  restaurants,
}: {
  restaurants: Restaurant[];
}) {
  const [selectedRestaurantId, setSelectedRestaurantId] = React.useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const restaurantId = searchParams.get("restaurantId") ?? "";
  console.log("restaurantId", restaurantId);

  function handleRestaurantChange(restaurantId: string) {
    setSelectedRestaurantId(restaurantId);
    router.push(`/admin/EditMenu?restaurantId=${restaurantId}`);
  }

  return (
    <Select value={selectedRestaurantId} onValueChange={handleRestaurantChange}>
      <SelectTrigger className="mb-4 md:w-72">
        <SelectValue placeholder="Select a Restaurant" />
      </SelectTrigger>
      <SelectContent>
        {restaurants.length > 0 && (
          <>
            {restaurants.map((restaurant: Restaurant, idx: number) => (
              <SelectItem key={idx} value={`${restaurant.id}`}>
                {restaurant.name}
              </SelectItem>
            ))}
          </>
        )}
      </SelectContent>
    </Select>
  );
}
