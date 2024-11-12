import EditMenuItemCard from "@/components/EditMenuItemCard";
import { getRestaurantMenu, getSession } from "@/lib/actions";
import { JWTPayload } from "jose";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();

  if ((session as JWTPayload).role !== "restaurant") return redirect("/");
  const menuItems = await getRestaurantMenu((session as JWTPayload).id);

  return (
    <div className="container mx-auto px-4">
      <div className="space-y-4">
        {menuItems?.map((menuItem, id) => (
          <EditMenuItemCard key={menuItem.id} item={menuItem} />
        ))}
      </div>
    </div>
  );
}
