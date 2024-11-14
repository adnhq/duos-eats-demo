import { getOrdersByRestaurant, getSession } from "@/lib/actions";
import OrderTableRow from "./OrderTableRow";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table";
import { JWTPayload } from "jose";

async function UserOrderTable() {
  const session = await getSession();
  const restaurantOrders = await getOrdersByRestaurant(
    (session as JWTPayload).id
  );

  return (
    <div className="hidden md:block">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Order Time</TableHead>
            <TableHead>Actions</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {restaurantOrders?.map((restaurantOrder) => (
            <OrderTableRow key={restaurantOrder.id} order={restaurantOrder} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default UserOrderTable;
