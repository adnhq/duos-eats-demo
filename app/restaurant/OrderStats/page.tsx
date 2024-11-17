import OrdersRealtimeUpdate from "@/components/OrdersRealtimeUpdate";
import RestaurantStats from "@/components/RestaurantStats";
import { getRestaurant, getSession } from "@/lib/actions";
import { JWTPayload } from "jose";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();

  if ((session as JWTPayload).role !== "restaurant") return redirect("/");

  const restaurants = await getRestaurant((session as JWTPayload).id);

  if (restaurants.length === 0) return null;

  return (
    <>
      <RestaurantStats
        discount={restaurants[0].discount}
        id={(session as JWTPayload).id}
      />
      <OrdersRealtimeUpdate />
    </>
  );
}
