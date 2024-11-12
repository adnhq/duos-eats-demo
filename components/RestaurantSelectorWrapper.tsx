import { getAllRestaurants } from "@/lib/actions";
import RestaurantSelector from "./RestaurantSelector";

export default async function RestaurantSelectorWrapper() {
  const restaurants = await getAllRestaurants();

  return <RestaurantSelector restaurants={restaurants} />;
}
