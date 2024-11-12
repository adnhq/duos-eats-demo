import React from "react";
import Sidebar from "./Sidebar";
import { getRestaurant, getSession } from "@/lib/actions";
import { JWTPayload } from "jose";
import { redirect } from "next/navigation";

export default async function SidebarWrapper() {
  const session = await getSession();
  if (!session || (session as JWTPayload).role !== "restaurant")
    return redirect("/");
  const restaurants = await getRestaurant((session as JWTPayload).id);

  return (
    <Sidebar restaurantName={restaurants[0].name} logo={restaurants[0].logo} />
  );
}
