import { RestaurantSettings } from "@/components/RestaurantSettings";
import { getSession } from "@/lib/actions";

export default async function Page() {
  const defaultValues = await getSession();

  return (
    <>
      <RestaurantSettings defaultValues={defaultValues} />
    </>
  );
}
