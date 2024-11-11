import SidebarWrapper from "@/components/SidebarWrapper";

export default function RestaurantDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[16rem_1fr] min-h-screen pb-20 pt-32">
      <SidebarWrapper />

      <main className="p-4">{children}</main>
    </div>
  );
}
