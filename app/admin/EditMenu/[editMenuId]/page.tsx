import EditMenuItemForm from "@/components/EditMenuForm";
import { getRestaurantMenuItem } from "@/lib/actions";

export default async function Page({
  params,
}: {
  params: Promise<{ editMenuId: string }>;
}) {
  const { editMenuId } = await params;
  const menuItem = await getRestaurantMenuItem(editMenuId);

  return <EditMenuItemForm initialData={menuItem} editMenuId={editMenuId} />;
}
