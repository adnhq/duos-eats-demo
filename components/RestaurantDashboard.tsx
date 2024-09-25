'use client'
import React, { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, DollarSign, ShoppingCart, Users, ChevronUp } from 'lucide-react'

// Dummy data for the sales chart
const generateSalesData = (days: any) => {
  return Array.from({ length: days }, (_, i) => ({
    date: new Date(Date.now() - (days - i - 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    sales: Math.floor(Math.random() * 10000) + 1000,
  }))
}

const allSalesData = generateSalesData(365) // Generate a year's worth of data

// Dummy data for recent orders
const recentOrders = [
  { id: '1', customer: 'John Doe', total: '$45.50', status: 'Completed' },
  { id: '2', customer: 'Jane Smith', total: '$32.00', status: 'In Progress' },
  { id: '3', customer: 'Bob Johnson', total: '$28.75', status: 'Completed' },
  { id: '4', customer: 'Alice Brown', total: '$52.25', status: 'Completed' },
  { id: '5', customer: 'Charlie Davis', total: '$18.50', status: 'In Progress' },
]

// Dummy data for top selling items
const topSellingItems = [
  { name: 'Margherita Pizza', quantity: 145, revenue: '$2,175' },
  { name: 'Chicken Wings', quantity: 98, revenue: '$980' },
  { name: 'Caesar Salad', quantity: 86, revenue: '$774' },
  { name: 'Cheeseburger', quantity: 72, revenue: '$648' },
  { name: 'Garlic Bread', quantity: 65, revenue: '$325' },
]

export default function RestaurantDashboard() {
  const [timeRange, setTimeRange] = useState('7d')
  const [salesData, setSalesData] = useState(allSalesData.slice(-7))

  const handleTimeRangeChange = (value: any) => {
    setTimeRange(value)
    switch (value) {
      case '7d':
        setSalesData(allSalesData.slice(-7))
        break
      case '1m':
        setSalesData(allSalesData.slice(-30))
        break
      case '6m':
        setSalesData(allSalesData.slice(-180))
        break
      case '1y':
        setSalesData(allSalesData)
        break
      case 'all':
        setSalesData(allSalesData)
        break
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key metrics */}
        <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-white border-t-4 border-[#FFC107] shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#1E293B]">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-[#FFC107]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#1E293B]">1,245</div>
              <p className="text-xs text-[#64748B] flex items-center mt-1">
                <ChevronUp className="h-4 w-4 text-green-500 mr-1" />
                15.8% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white border-t-4 border-[#10B981] shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#1E293B]">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-[#10B981]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#1E293B]">$23,456</div>
              <p className="text-xs text-[#64748B] flex items-center mt-1">
                <ChevronUp className="h-4 w-4 text-green-500 mr-1" />
                20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white border-t-4 border-[#3B82F6] shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#1E293B]">Avg. Order Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-[#3B82F6]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#1E293B]">$18.85</div>
              <p className="text-xs text-[#64748B] flex items-center mt-1">
                <ChevronUp className="h-4 w-4 text-green-500 mr-1" />
                4.3% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white border-t-4 border-[#8B5CF6] shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#1E293B]">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-[#8B5CF6]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#1E293B]">3,456</div>
              <p className="text-xs text-[#64748B] flex items-center mt-1">
                <ChevronUp className="h-4 w-4 text-green-500 mr-1" />
                8.2% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sales chart */}
        <Card className="mb-8 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-bold text-[#1E293B]">Sales Overview</CardTitle>
            <Select value={timeRange} onValueChange={handleTimeRangeChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="1m">Last month</SelectItem>
                <SelectItem value="6m">Last 6 months</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="date" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFF', borderColor: '#E2E8F0' }}
                  labelStyle={{ color: '#1E293B' }}
                />
                <Line type="monotone" dataKey="sales" stroke="#FFC107" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent orders and top selling items */}
        <div className="grid gap-6 mb-8 lg:grid-cols-2">
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-[#1E293B]">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-[#64748B]">Order ID</TableHead>
                    <TableHead className="text-[#64748B]">Customer</TableHead>
                    <TableHead className="text-[#64748B]">Total</TableHead>
                    <TableHead className="text-[#64748B]">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium text-[#1E293B]">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.total}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-[#1E293B]">Top Selling Items</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-[#64748B]">Item</TableHead>
                    <TableHead className="text-[#64748B]">Quantity</TableHead>
                    <TableHead className="text-[#64748B]">Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topSellingItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium text-[#1E293B]">{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.revenue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}