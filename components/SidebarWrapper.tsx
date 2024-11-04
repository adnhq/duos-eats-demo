import React from "react";
import Sidebar from "./Sidebar";
import { getRestaurant, getSession } from "@/lib/actions";
import { JWTPayload } from "jose";
import { redirect } from "next/navigation";

export default async function SidebarWrapper() {
  const session = await getSession();
  const restaurants = await getRestaurant((session as JWTPayload).id);

  if ((session as JWTPayload).isAdmin) return redirect("/");
  return (
    <Sidebar restaurantName={restaurants[0].name} logo={restaurants[0].logo} />
  );
}
