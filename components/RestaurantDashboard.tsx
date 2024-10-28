"use client"

import { useState } from 'react'
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'
import { AlertCircle, CalendarIcon, ChefHat, CreditCard, DollarSign, Eye, Receipt, Utensils } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const revenueData = [
  { date: "2023-03-01", revenue: 5200 },
  { date: "2023-03-02", revenue: 4800 },
  { date: "2023-03-03", revenue: 5500 },
  { date: "2023-03-04", revenue: 6200 },
  { date: "2023-03-05", revenue: 7100 },
  { date: "2023-03-06", revenue: 6800 },
  { date: "2023-03-07", revenue: 7500 },
]

const historicalData = [
  { date: "2023-03-07 19:23", orderId: "ORD001", items: [
    { name: "Pasta", price: 800, quantity: 1 },
    { name: "Salad", price: 400, quantity: 1 }
  ], originalAmount: 1200, discount: 15, platformFee: 60, finalEarnings: 960 },
  { date: "2023-03-07 20:05", orderId: "ORD002", items: [
    { name: "Pizza", price: 600, quantity: 1 },
    { name: "Soda", price: 200, quantity: 1 }
  ], originalAmount: 800, discount: 10, platformFee: 40, finalEarnings: 680 },
  { date: "2023-03-06 13:45", orderId: "ORD003", items: [
    { name: "Burger", price: 350, quantity: 1 },
    { name: "Fries", price: 150, quantity: 1 }
  ], originalAmount: 500, discount: 20, platformFee: 25, finalEarnings: 375 },
  { date: "2023-03-06 18:30", orderId: "ORD004", items: [
    { name: "Steak", price: 1500, quantity: 1 },
    { name: "Wine", price: 500, quantity: 1 }
  ], originalAmount: 2000, discount: 5, platformFee: 100, finalEarnings: 1800 },
  { date: "2023-03-05 12:15", orderId: "ORD005", items: [
    { name: "Sandwich", price: 200, quantity: 1 },
    { name: "Coffee", price: 100, quantity: 1 }
  ], originalAmount: 300, discount: 0, platformFee: 15, finalEarnings: 285 },
]

export default function EnhancedRestaurantDashboard() {
  const [dateRange, setDateRange] = useState("This Week")
  const [currentDiscount, setCurrentDiscount] = useState("15%")

  const todayStats = {
    earnings: 7500,
    orders: 78,
    averageOrderValue: 96
  }

  const weeklyMonthlyStats = {
    weeklyEarnings: 43100,
    weeklyOrders: 450,
    monthlyEarnings: 186400,
    monthlyOrders: 1950
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Restaurant Dashboard</h1>
            <p className="text-gray-500">Welcome back, Restaurant Owner</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline">
              <CalendarIcon className="mr-2 h-4 w-4" /> March 2023
            </Button>
            <Button>
              <DollarSign className="mr-2 h-4 w-4" /> Pay Dues
            </Button>
          </div>
        </div>

        {/* Alert */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Attention Required</AlertTitle>
          <AlertDescription>
            You have BDT 2,450 in pending platform fees. Please clear your dues to avoid any service interruptions.
          </AlertDescription>
        </Alert>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-lg bg-gradient-to-br from-blue-500 to-blue-600">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-white">Today's Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-white" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">BDT {todayStats.earnings.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card className="shadow-lg bg-gradient-to-br from-green-500 to-green-600">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-white">Today's Orders</CardTitle>
              <Utensils className="h-4 w-4 text-white" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{todayStats.orders}</div>
            </CardContent>
          </Card>

          <Card className="shadow-lg bg-gradient-to-br from-purple-500 to-purple-600">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-white">Avg. Order Value</CardTitle>
              <Receipt className="h-4 w-4 text-white" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">BDT {todayStats.averageOrderValue}</div>
            </CardContent>
          </Card>
        </div>

        {/* Current Discount and Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Current Discount
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Select value={currentDiscount} onValueChange={setCurrentDiscount}>
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
              <Button className="w-full mt-4">Apply New Discount</Button>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Weekly Earnings</p>
                  <p className="text-2xl font-bold">BDT {weeklyMonthlyStats.weeklyEarnings.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Weekly Orders</p>
                  <p className="text-2xl font-bold">{weeklyMonthlyStats.weeklyOrders}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Monthly Earnings</p>
                  <p className="text-2xl font-bold">BDT {weeklyMonthlyStats.monthlyEarnings.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Monthly Orders</p>
                  <p className="text-2xl font-bold">{weeklyMonthlyStats.monthlyOrders}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList>
            <TabsTrigger value="analytics">Order Analytics</TabsTrigger>
            <TabsTrigger value="revenue">Revenue Trend</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Order Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center p-4 border rounded-lg shadow-sm">
                      <Utensils className="h-6 w-6 mr-4 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Today's Order Count</p>
                        <p className="text-2xl font-bold">{todayStats.orders}</p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 border rounded-lg shadow-sm">
                      <ChefHat className="h-6 w-6 mr-4 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Active Orders</p>
                        <p className="text-2xl font-bold">12</p>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 shadow-sm">
                    <h4 className="text-lg font-medium mb-4">Most Ordered Items (Top 5)</h4>
                    <ol className="space-y-2">
                      {[
                        "Margherita Pizza",
                        "Chicken Tikka Masala",
                        "Vegetable Biryani",
                        "Chocolate Brownie",
                        "Mango Lassi"
                      ].map((item, index) => (
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

          <TabsContent value="revenue">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Weekly Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <XAxis 
                        dataKey="date" 
                        stroke="#888888"
                        tickFormatter={(value) => new Date(value).toLocaleDateString()}
                      />
                      <YAxis stroke="#888888" />
                      <Tooltip 
                        contentStyle={{ background: 'white', border: '1px solid #e5e7eb' }}
                        formatter={(value) => [`$${value}`, 'Revenue']}
                        labelFormatter={(label) => new Date(label).toLocaleDateString()}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#8884d8" 
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Historical Data Table */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              Historical Data
            </CardTitle>
            <div className="flex items-center space-x-4">
              <Label htmlFor="date-range" className="text-sm">Date Range:</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger id="date-range" className="w-[180px]">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem  value="Today">Today</SelectItem>
                  <SelectItem value="This Week">This Week</SelectItem>
                  <SelectItem value="This Month">This Month</SelectItem>
                  <SelectItem value="Custom">Custom</SelectItem>
                </SelectContent>
              </Select>
              {dateRange === "Custom" && (
                <div className="flex items-center space-x-2">
                  <Input type="date" className="w-[150px]" />
                  <span className="text-sm text-muted-foreground">to</span>
                  <Input type="date" className="w-[150px]" />
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
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
                            <DialogTitle>Order Receipt: {order.orderId}</DialogTitle>
                            <DialogDescription>Order details for {order.date}</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right">Item</Label>
                              <Label className="text-right">Price</Label>
                              <Label className="text-right">Qty</Label>
                              <Label className="text-right">Total</Label>
                            </div>
                            {order.items.map((item, index) => (
                              <div key={index} className="grid grid-cols-4 items-center gap-4">
                                <div className="text-sm">{item.name}</div>
                                <div className="text-sm text-right">BDT {item.price}</div>
                                <div className="text-sm text-right">{item.quantity}</div>
                                <div className="text-sm text-right">BDT {item.price * item.quantity}</div>
                              </div>
                            ))}
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                              <Label className="text-right font-bold">Subtotal:</Label>
                              <div className="text-right font-bold">BDT {order.originalAmount}</div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}