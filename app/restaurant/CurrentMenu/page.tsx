import { getRestaurantMenu, getSession } from "@/lib/actions";
import React from "react";

export default async function Page() {
  const { id } = await getSession();
  const menuItems = await getRestaurantMenu(id);

  return <div>Page</div>;
}
