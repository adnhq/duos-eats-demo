import { getRestaurants } from "@/lib/data";

export default async function Page() {
  const restaurants = await getRestaurants();
  console.log(restaurants);
  return (
    <>
      {restaurants?.map((restaurant, idx) => {
        return <div key={idx}>{restaurant.name}</div>;
      })}
    </>
  );
}
