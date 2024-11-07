import SidebarWrapper from "@/components/SidebarWrapper";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function RestaurantDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[16rem_1fr] min-h-screen pb-20 pt-32">
      <SidebarWrapper />
      {/* <Suspense fallback={<Spinner />}> */}
      <main className="p-4">
        <ScrollArea className="md:h-[78vh] h-full mx-auto space-y-8 pb-20">
          <>{children}</>
        </ScrollArea>
      </main>
      {/* </Suspense> */}
    </div>
  );
}
