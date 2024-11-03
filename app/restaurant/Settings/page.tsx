import { RestaurantSettings } from "@/components/RestaurantSettings";
import { getRestaurant, getSession } from "@/lib/actions";

export default async function Page() {
  const { id } = await getSession();
  const restaurant = await getRestaurant(id);

  return (
    <>
      <RestaurantSettings defaultValues={restaurant[0]} id={id} />
    </>
  );
}
