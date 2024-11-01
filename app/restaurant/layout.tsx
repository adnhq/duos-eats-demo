import Sidebar from "@/components/Sidebar";
import { getSession } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function RestaurantDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (session.isAdmin) return redirect("/");
  return (
    <div className="grid grid-cols-[16rem_1fr] min-h-screen py-12">
      <Sidebar restaurantName={session.name} />

      <main className="flex-1 p-4">
        <div className="mx-auto space-y-8">{children}</div>
      </main>
    </div>
  );
}