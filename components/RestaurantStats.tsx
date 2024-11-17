import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getOrdersByRestaurant, getRestaurantEarnings } from "@/lib/actions";
import { DollarSign, Utensils } from "lucide-react";
import { OrdersTab } from "./OrdersTab";

const todayStats = {
  earnings: 0,
  orders: 0,
  averageOrderValue: 0,
};

const weeklyMonthlyStats = {
  weeklyEarnings: 0,
  weeklyOrders: 0,
  monthlyEarnings: 0,
  monthlyOrders: 0,
};
// const activeOrders: any[] = [
// {
//   orderId: "ORD006",
//   customerName: "Alice Johnson",
//   items: [
//     { name: "Burger", price: 350, quantity: 1 },
//     { name: "Fries", price: 150, quantity: 1 },
//   ],
//   totalAmount: 500,
//   orderTime: "2023-03-08 14:30",
// },
// {
//   orderId: "ORD007",
//   customerName: "Bob Smith",
//   items: [
//     { name: "Pizza", price: 600, quantity: 1 },
//     { name: "Soda", price: 200, quantity: 2 },
//   ],
//   totalAmount: 1000,
//   orderTime: "2023-03-08 14:45",
// },
// ];

// const historicalData: any[] = [
// {
//   date: "2023-03-07 19:23",
//   orderId: "ORD001",
//   items: [
//     { name: "Pasta", price: 800, quantity: 1 },
//     { name: "Salad", price: 400, quantity: 1 },
//   ],
//   originalAmount: 1200,
//   discount: 15,
//   platformFee: 60,
//   finalEarnings: 960,
// },
// {
//   date: "2023-03-07 20:05",
//   orderId: "ORD002",
//   items: [
//     { name: "Pizza", price: 600, quantity: 1 },
//     { name: "Soda", price: 200, quantity: 1 },
//   ],
//   originalAmount: 800,
//   discount: 10,
//   platformFee: 40,
//   finalEarnings: 680,
// },
// {
//   date: "2023-03-06 13:45",
//   orderId: "ORD003",
//   items: [
//     { name: "Burger", price: 350, quantity: 1 },
//     { name: "Fries", price: 150, quantity: 1 },
//   ],
//   originalAmount: 500,
//   discount: 20,
//   platformFee: 25,
//   finalEarnings: 375,
// },
// {
//   date: "2023-03-06 18:30",
//   orderId: "ORD004",
//   items: [
//     { name: "Steak", price: 1500, quantity: 1 },
//     { name: "Wine", price: 500, quantity: 1 },
//   ],
//   originalAmount: 2000,
//   discount: 5,
//   platformFee: 100,
//   finalEarnings: 1800,
// },
// {
//   date: "2023-03-05 12:15",
//   orderId: "ORD005",
//   items: [
//     { name: "Sandwich", price: 200, quantity: 1 },
//     { name: "Coffee", price: 100, quantity: 1 },
//   ],
//   originalAmount: 300,
//   discount: 0,
//   platformFee: 15,
//   finalEarnings: 285,
// },
// ];
export default async function RestaurantStats({
  discount,
  id,
}: {
  discount: string;
  id: string | unknown;
}) {
  const { totalEarnings, totalPlatformFee } =
    (await getRestaurantEarnings(id)) || {};
  const restaurantOrders = await getOrdersByRestaurant(id);
  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 pb-4">
        <Card className="shadow-lg bg-gradient-to-br from-blue-500 to-blue-600">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Total Earnings
            </CardTitle>
            <DollarSign className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              Tk {totalEarnings.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg bg-gradient-to-br from-green-500 to-green-600">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Pending Dues
            </CardTitle>
            <Utensils className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              Tk {totalPlatformFee.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        {/* <Card className="shadow-lg bg-gradient-to-br from-purple-500 to-purple-600">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Avg. Order Value
            </CardTitle>
            <Receipt className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              BDT {todayStats.averageOrderValue}
            </div>
          </CardContent>
        </Card> */}
      </div>

      <OrdersTab
        // activeOrders={activeOrders}
        // historicalData={historicalData}
        restaurantOrders={restaurantOrders}
        restaurantId={id}
        discount={discount}
        todayStats={todayStats}
        weeklyMonthlyStats={weeklyMonthlyStats}
      />
    </>
  );
}
