import Sidebar from "@/components/Sidebar";
import Spinner from "@/components/Spinner";
import { getRestaurant, getSession } from "@/lib/actions";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function RestaurantDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const restaurants = await getRestaurant(session.id);

  if (session.isAdmin) return redirect("/");
  return (
    <div className="grid grid-cols-1 md:grid-cols-[16rem_1fr] min-h-screen py-12">
      <Sidebar
        restaurantName={restaurants[0].name}
        logo={restaurants[0].logo}
      />
      <Suspense fallback={<Spinner />}>
        <main className="flex-1 p-4">
          <div className="mx-auto space-y-8">{children}</div>
        </main>
      </Suspense>
    </div>
  );
}
