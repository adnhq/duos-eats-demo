import AdminDashboard from "@/components/AdminDashboard";
import { getSession } from "@/lib/actions";
import { JWTPayload } from "jose";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();

  if ((session as JWTPayload).role !== "admin") return redirect("/");

  return (
    <main className="max-w-7xl mx-auto pt-24">
      <AdminDashboard />;
    </main>
  );
}
