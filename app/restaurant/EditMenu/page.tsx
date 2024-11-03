import EditMenuItemCard from "@/components/EditMenuItemCard";
import { getRestaurantMenu, getSession } from "@/lib/actions";

export default async function Page() {
  const { id } = await getSession();
  const menuItems = await getRestaurantMenu(id);

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
