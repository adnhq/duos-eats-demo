import { getRestaurantMenu, getSession } from "@/lib/actions";
import React from "react";
import EditMenuItemCard from "./EditMenuItemCard";
import { JWTPayload } from "jose";

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
      {menuItems?.map((menuItem, id) => (
        <EditMenuItemCard
          key={menuItem.id}
          item={menuItem}
          role={session.role}
        />
      ))}
    </div>
  );
}
