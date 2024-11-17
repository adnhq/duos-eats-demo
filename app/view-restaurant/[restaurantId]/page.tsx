import RestaurantView from "@/components/RestaurantView";
import Spinner from "@/components/Spinner";
import { getRestaurant } from "@/lib/actions";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ restaurantId: string }>;
}) {
  const { restaurantId } = await params;
  const restaurant = await getRestaurant(restaurantId);

  if (restaurant.length === 0) return <h1>No Restaurant found</h1>;

  return (
    <main className="max-w-7xl min-h-screen mx-auto pt-24">
      <Suspense fallback={<Spinner />}>
        <RestaurantView restaurantId={restaurantId} />
      </Suspense>
    </main>
  );
}
