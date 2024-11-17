import { getRestaurant, getRestaurantMenu } from "@/lib/actions";
import RestaurantMenu from "./RestaurantMenu";

export default async function RestaurantView({
  restaurantId,
}: {
  restaurantId: string;
}) {
  const restaurants = await getRestaurant(restaurantId);
  if (restaurants.length === 0) return;
  const menuItems = await getRestaurantMenu(restaurants[0].id);

  if (restaurants.length === 0) return <h1>No Restaurant found</h1>;

  return (
    <RestaurantMenu restaurantData={restaurants[0]} menuItems={menuItems} />
  );
}
