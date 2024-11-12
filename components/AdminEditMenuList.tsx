import { getRestaurantMenu, getSession } from "@/lib/actions";
import EditMenuItemCard from "./EditMenuItemCard";

export default async function AdminEditMenuList({
  restaurantId,
}: {
  restaurantId: string;
}) {
  const menuItems = restaurantId ? await getRestaurantMenu(restaurantId) : [];
  const session = await getSession();

  if (session === null) return null;

  return (
    <div className="space-y-4">
      {menuItems?.map((menuItem) => (
        <EditMenuItemCard
          key={menuItem.id}
          item={menuItem}
          role={session.role}
        />
      ))}
    </div>
  );
}
