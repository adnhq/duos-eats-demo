import { getSession, getUserName } from "@/lib/actions";
import { JWTPayload } from "jose";
import { redirect } from "next/navigation";
import UserSidebar from "./UserSidebar";

export default async function UserSidebarWrapper() {
  const session = await getSession();
  if (!session || (session as JWTPayload).role !== "user") return redirect("/");

  const username = await getUserName((session as JWTPayload).id);

  return <UserSidebar username={username.split(" ")[0]} />;
}
