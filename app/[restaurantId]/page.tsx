import RestaurantMenu from "@/components/RestaurantMenu";
import { getRestaurant } from "@/lib/actions";
import React from "react";

type Props = {
  params: {
    restaurantId: string;
  };
};

export default async function Page({ params }: Props) {
  const { restaurantId } = params;
  const restaurant = await getRestaurant(restaurantId);

  if (!restaurant.length) return <h1>No Restaurant found</h1>;

  return <RestaurantMenu restaurantData={restaurant[0]} />;
}
