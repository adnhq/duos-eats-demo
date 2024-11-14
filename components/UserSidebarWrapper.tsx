import { getSession } from "@/lib/actions";
import { JWTPayload } from "jose";
import { redirect } from "next/navigation";
import UserSidebar from "./UserSidebar";

export default async function UserSidebarWrapper() {
  const session = await getSession();
  if (!session || (session as JWTPayload).role !== "user") return redirect("/");
  //   const restaurants = await getRestaurant((session as JWTPayload).id);

  return <UserSidebar username="test" />;
}
