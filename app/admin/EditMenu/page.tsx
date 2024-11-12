import AdminEditMenuList from "@/components/AdminEditMenuList";
import RestaurantSelectorWrapper from "@/components/RestaurantSelectorWrapper";
import Spinner from "@/components/Spinner";
import { Suspense } from "react";

type PageProps = {
  searchParams: Promise<{
    restaurantId?: string;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const { restaurantId } = await searchParams;

  return (
    <div>
      <RestaurantSelectorWrapper />

      <Suspense fallback={<Spinner />} key={restaurantId}>
        {restaurantId ? (
          <AdminEditMenuList restaurantId={restaurantId} />
        ) : (
          <p className="text-center mt-4 text-sm text-muted-foreground">
            Please select a restaurant to edit the menu items
          </p>
        )}
      </Suspense>
    </div>
  );
}
