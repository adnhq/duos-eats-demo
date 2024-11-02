// components/OrdersTab.tsx
import { useState } from "react";
import {
  Utensils,
  Eye,
  CheckCircle,
  XCircle,
  ChefHat,
  Receipt,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  orderId: string;
  customerName: string;
  items: OrderItem[];
  totalAmount: number;
  orderTime: string;
}

interface HistoricalOrder {
  date: string;
  orderId: string;
  items: OrderItem[];
  originalAmount: number;
  discount: number;
  platformFee: number;
  finalEarnings: number;
}

interface WeeklyMonthlyStats {
  weeklyEarnings: number;
  weeklyOrders: number;
  monthlyEarnings: number;
  monthlyOrders: number;
}

interface TodayStats {
  earnings: number;
  orders: number;
  averageOrderValue: number;
}

interface OrdersTabProps {
  activeOrders: Order[];
  historicalData: HistoricalOrder[];
  todayStats: TodayStats;
  weeklyMonthlyStats: WeeklyMonthlyStats;
}

export function OrdersTab({
  activeOrders,
  historicalData,
  todayStats,
  weeklyMonthlyStats,
}: OrdersTabProps) {
  const [dateRange, setDateRange] = useState("This Week");
  const [currentDiscount, setCurrentDiscount] = useState("10%");

  // Mobile-responsive card view for orders
  const OrderCard = ({ order }: { order: Order }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="font-medium">Order #{order.orderId}</p>
          <p className="text-sm text-muted-foreground">{order.customerName}</p>
        </div>
        <p className="text-sm text-muted-foreground">{order.orderTime}</p>
      </div>

      <div className="mb-3">
        <p className="text-sm font-medium">Amount: BDT {order.totalAmount}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="flex-1">
              <Eye className="mr-2 h-4 w-4" />
              View Items
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
              <DialogDescription>
                Order #{order.orderId} • {order.orderTime}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center py-2 border-b"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      BDT {item.price} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    BDT {item.price * item.quantity}
                  </p>
                </div>
              ))}
              <div className="flex justify-between items-center pt-2">
                <p className="font-bold">Total</p>
                <p className="font-bold">BDT {order.totalAmount}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <Button variant="default" size="sm" className="flex-1">
          <CheckCircle className="mr-2 h-4 w-4" />
          Accept
        </Button>
        <Button variant="destructive" size="sm" className="flex-1">
          <XCircle className="mr-2 h-4 w-4" />
          Decline
        </Button>
      </div>
    </div>
  );

  // Mobile-responsive card view for historical orders
  const HistoricalOrderCard = ({ order }: { order: HistoricalOrder }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="font-medium">Order #{order.orderId}</p>
          <p className="text-sm text-muted-foreground">{order.date}</p>
        </div>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex justify-between">
          <p className="text-sm text-muted-foreground">Original Amount</p>
          <p className="text-sm font-medium">BDT {order.originalAmount}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-muted-foreground">Discount</p>
          <p className="text-sm font-medium">{order.discount}%</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-muted-foreground">Platform Fee</p>
          <p className="text-sm font-medium">BDT {order.platformFee}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm font-medium">Final Earnings</p>
          <p className="text-sm font-medium">BDT {order.finalEarnings}</p>
        </div>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="w-full">
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Order #{order.orderId} • {order.date}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center py-2 border-b"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    BDT {item.price} × {item.quantity}
                  </p>
                </div>
                <p className="font-medium">BDT {item.price * item.quantity}</p>
              </div>
            ))}
            <div className="space-y-2">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>BDT {order.originalAmount}</p>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <p>Discount ({order.discount}%)</p>
                <p>
                  - BDT{" "}
                  {((order.originalAmount * order.discount) / 100).toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <p>Platform Fee</p>
                <p>- BDT {order.platformFee}</p>
              </div>
              <div className="flex justify-between font-bold pt-2 border-t">
                <p>Final Earnings</p>
                <p>BDT {order.finalEarnings}</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );

  return (
    <Tabs defaultValue="orders" className="space-y-6">
      <TabsList className="justify-start">
        <TabsTrigger value="orders">Order Stats</TabsTrigger>
        <TabsTrigger value="revenue">Revenue</TabsTrigger>
      </TabsList>

      <TabsContent value="orders" className="space-y-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Pending Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Mobile view */}
            <div className="md:hidden space-y-4">
              {activeOrders.length > 0 ? (
                activeOrders.map((order) => (
                  <OrderCard key={order.orderId} order={order} />
                ))
              ) : (
                <p className="text-center text-muted-foreground text-sm">
                  No active orders
                </p>
              )}
            </div>

            {/* Desktop view */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Order Time</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeOrders.map((order) => (
                    <TableRow key={order.orderId}>
                      <TableCell>{order.orderId}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>BDT {order.totalAmount}</TableCell>
                      <TableCell>{order.orderTime}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Order Details</DialogTitle>
                                <DialogDescription>
                                  Order #{order.orderId} • {order.orderTime}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                {order.items.map((item, idx) => (
                                  <div
                                    key={idx}
                                    className="flex justify-between items-center py-2 border-b"
                                  >
                                    <div>
                                      <p className="font-medium">{item.name}</p>
                                      <p className="text-sm text-muted-foreground">
                                        BDT {item.price} × {item.quantity}
                                      </p>
                                    </div>
                                    <p className="font-medium">
                                      BDT {item.price * item.quantity}
                                    </p>
                                  </div>
                                ))}
                                <div className="flex justify-between items-center pt-2">
                                  <p className="font-bold">Total</p>
                                  <p className="font-bold">
                                    BDT {order.totalAmount}
                                  </p>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="default" size="sm">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Accept
                          </Button>
                          <Button variant="destructive" size="sm">
                            <XCircle className="mr-2 h-4 w-4" />
                            Decline
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Order Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center p-4 border rounded-lg shadow-sm">
                  <Utensils className="h-6 w-6 mr-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Today's Order Count
                    </p>
                    <p className="text-2xl font-bold">{todayStats.orders}</p>
                  </div>
                </div>
                <div className="flex items-center p-4 border rounded-lg shadow-sm">
                  <ChefHat className="h-6 w-6 mr-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Pending Orders
                    </p>
                    <p className="text-2xl font-bold">{activeOrders.length}</p>
                  </div>
                </div>
              </div>
              <div className="border rounded-lg p-4 shadow-sm">
                <h4 className="text-lg font-medium mb-4">
                  Most Ordered Items (Top 5)
                </h4>
                <ol className="space-y-2">
                  {[
                    // "Margherita Pizza",
                    // "Chicken Tikka Masala",
                    // "Vegetable Biryani",
                    // "Chocolate Brownie",
                    // "Mango Lassi",
                  ].map((item: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <span className="w-6 h-6 flex items-center justify-center bg-primary text-primary-foreground rounded-full mr-2 text-xs">
                        {index + 1}
                      </span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="revenue" className="space-y-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Revenue Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Weekly Earnings
                </p>
                <p className="text-2xl font-bold">
                  BDT {weeklyMonthlyStats.weeklyEarnings.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Weekly Orders
                </p>
                <p className="text-2xl font-bold">
                  {weeklyMonthlyStats.weeklyOrders}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Monthly Earnings
                </p>
                <p className="text-2xl font-bold">
                  BDT {weeklyMonthlyStats.monthlyEarnings.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Monthly Orders
                </p>
                <p className="text-2xl font-bold">
                  {weeklyMonthlyStats.monthlyOrders}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Current Discount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Select
                value={currentDiscount}
                onValueChange={setCurrentDiscount}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select discount" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0%">0%</SelectItem>
                  <SelectItem value="5%">5%</SelectItem>
                  <SelectItem value="10%">10%</SelectItem>
                  <SelectItem value="15%">15%</SelectItem>
                  <SelectItem value="20%">20%</SelectItem>
                  <SelectItem value="25%">25%</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-3xl font-bold">{currentDiscount}</span>
            </div>
            <Button className="w-full mt-4" disabled={true}>
              Apply New Discount
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              Historical Data
            </CardTitle>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <Label
                  htmlFor="date-range"
                  className="text-sm whitespace-nowrap"
                >
                  Date Range:
                </Label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger id="date-range" className="w-[140px]">
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Today">Today</SelectItem>
                    <SelectItem value="This Week">This Week</SelectItem>
                    <SelectItem value="This Month">This Month</SelectItem>
                    <SelectItem value="Custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {dateRange === "Custom" && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
                  <Input type="date" className="w-full sm:w-[140px]" />
                  <span className="text-sm text-muted-foreground">to</span>
                  <Input type="date" className="w-full sm:w-[140px]" />
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {/* Mobile view */}
            <div className="md:hidden space-y-4">
              {historicalData.length > 0 ? (
                historicalData.map((order) => (
                  <HistoricalOrderCard key={order.orderId} order={order} />
                ))
              ) : (
                <p className="text-center text-muted-foreground text-sm">
                  No pending orders
                </p>
              )}
            </div>

            {/* Desktop view */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Original Amount</TableHead>
                    <TableHead>Discount %</TableHead>
                    <TableHead>Platform Fee</TableHead>
                    <TableHead>Final Earnings</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {historicalData.map((order) => (
                    <TableRow key={order.orderId}>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.orderId}</TableCell>
                      <TableCell>BDT {order.originalAmount}</TableCell>
                      <TableCell>{order.discount}%</TableCell>
                      <TableCell>BDT {order.platformFee}</TableCell>
                      <TableCell>BDT {order.finalEarnings}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Order Details</DialogTitle>
                              <DialogDescription>
                                Order #{order.orderId} • {order.date}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              {order.items.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="flex justify-between items-center py-2 border-b"
                                >
                                  <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                      BDT {item.price} × {item.quantity}
                                    </p>
                                  </div>
                                  <p className="font-medium">
                                    BDT {item.price * item.quantity}
                                  </p>
                                </div>
                              ))}
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <p>Subtotal</p>
                                  <p>BDT {order.originalAmount}</p>
                                </div>
                                <div className="flex justify-between text-muted-foreground">
                                  <p>Discount ({order.discount}%)</p>
                                  <p>
                                    - BDT{" "}
                                    {(
                                      (order.originalAmount * order.discount) /
                                      100
                                    ).toFixed(2)}
                                  </p>
                                </div>
                                <div className="flex justify-between text-muted-foreground">
                                  <p>Platform Fee</p>
                                  <p>- BDT {order.platformFee}</p>
                                </div>
                                <div className="flex justify-between font-bold pt-2 border-t">
                                  <p>Final Earnings</p>
                                  <p>BDT {order.finalEarnings}</p>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
