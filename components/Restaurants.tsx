import { getAllRestaurants } from "@/lib/actions";
import { Restaurant } from "@/lib/types";
import RestaurantCard from "./RestaurantCard";

const locations = [
  "Uttara",
  "Mirpur",
  "Pallabi",
  "Kazipara",
  "Kafrul",
  "Agargaon",
  "Banani",
  "Gulshan",
  "Niketan",
  "Shahjadpur",
  "Mohakhali",
  "Bashundhara",
  "Banasree",
  "Aftab Nagar",
  "Baridhara",
  "Khilkhet",
  "Tejgaon",
  "Farmgate",
  "Mohammadpur",
  "Rampura",
  "Badda",
  "Khilgaon",
];

export default async function Restaurants() {
  const restaurants = await getAllRestaurants();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white">
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">All Restaurants</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {restaurants.map((restaurant: Restaurant, index: number) => (
            <RestaurantCard key={`${index}`} restaurant={restaurant} />
          ))}
        </div>
      </section>
    </div>
  );
}
