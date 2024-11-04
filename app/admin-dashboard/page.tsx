import AdminDashboard from "@/components/AdminDashboard";
import { getSession } from "@/lib/actions";
import { JWTPayload } from "jose";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();

  if (!(session as JWTPayload).isAdmin) return redirect("/");

  return <AdminDashboard />;
}
