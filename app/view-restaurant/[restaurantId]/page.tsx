import RestaurantMenu from "@/components/RestaurantMenu";
import { getRestaurant } from "@/lib/actions";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ restaurantId: string }>;
}) {
  const { restaurantId } = await params;
  const restaurant = await getRestaurant(restaurantId);

  if (restaurant.length === 0) return <h1>No Restaurant found</h1>;

  return (
    <main className="max-w-7xl mx-auto pt-24">
      <RestaurantMenu restaurantData={restaurant[0]} />;
    </main>
  );
}
