export default async function Page({
  params,
}: {
  params: Promise<{ editMenuId: string }>;
}) {
  const { editMenuId } = await params;
  return <div>Should Edit {editMenuId}</div>;
}
