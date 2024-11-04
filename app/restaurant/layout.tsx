import SidebarWrapper from "@/components/SidebarWrapper";

export default function RestaurantDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[16rem_1fr] min-h-screen py-12">
      <SidebarWrapper />
      {/* <Suspense fallback={<Spinner />}> */}
      <main className="flex-1 p-4">
        <div className="mx-auto space-y-8">{children}</div>
      </main>
      {/* </Suspense> */}
    </div>
  );
}
