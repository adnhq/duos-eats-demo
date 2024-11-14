import UserOrders from "@/components/UserOrders";

function Page() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Your Orders</h2>
      <UserOrders />
    </div>
  );
}

export default Page;
