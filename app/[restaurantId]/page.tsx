import RestaurantMenu from "@/components/RestaurantMenu";
import { getRestaurant } from "@/lib/actions";
import React from "react";

type Params = {
  restaurantId: string;
};

type PageProps = {
  params: Params;
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({ params }: PageProps) {
  const { restaurantId } = params;
  const restaurant = await getRestaurant(restaurantId);

  if (restaurant.length === 0) return <h1>No Restaurant found</h1>;

  return <RestaurantMenu restaurantData={restaurant[0]} />;
}