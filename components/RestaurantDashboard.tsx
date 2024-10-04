'use client'

import React, { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, DollarSign, ShoppingCart, Users, ChevronUp } from 'lucide-react'
import { motion } from 'framer-motion'

// Dummy data for the sales chart
const generateSalesData = (days: number) => {
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

  const handleTimeRangeChange = (value: string) => {
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
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-8">Restaurant Dashboard</h1>
        {/* Key metrics */}
        <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: 'Total Orders', value: '1,245', icon: ShoppingCart, color: 'blue', increase: '15.8%' },
            { title: 'Total Revenue', value: '$23,456', icon: DollarSign, color: 'green', increase: '20.1%' },
            { title: 'Avg. Order Value', value: '$18.85', icon: TrendingUp, color: 'amber', increase: '4.3%' },
            { title: 'Total Customers', value: '3,456', icon: Users, color: 'purple', increase: '8.2%' },
          ].map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden transform hover:-translate-y-1 bg-gradient-to-br from-${metric.color}-500 via-${metric.color}-600 to-${metric.color}-700 text-white`}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                  <metric.icon className={`h-5 w-5 text-${metric.color}-500`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <p className="text-xs flex items-center mt-1">
                    <ChevronUp className="h-4 w-4 text-green-500 mr-1" />
                    {metric.increase} from last month
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Sales chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="mb-8 shadow-lg hover:shadow-xl transition-shadow bg-white">
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
              <CardTitle className="text-xl font-bold text-gray-900">Sales Overview</CardTitle>
              <Select value={timeRange} onValueChange={handleTimeRangeChange}>
                <SelectTrigger className="w-full sm:w-[180px]">
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
                  <Line 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#ffa200" 
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent orders and top selling items */}
        <div className="grid gap-6 mb-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-gray-600">Order ID</TableHead>
                        <TableHead className="text-gray-600">Customer</TableHead>
                        <TableHead className="text-gray-600">Total</TableHead>
                        <TableHead className="text-gray-600">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentOrders.map((order) => (
                        <TableRow key={order.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium text-gray-900">{order.id}</TableCell>
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
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Top Selling Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-gray-600">Item</TableHead>
                        <TableHead className="text-gray-600">Quantity</TableHead>
                        <TableHead className="text-gray-600">Revenue</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topSellingItems.map((item, index) => (
                        <TableRow key={index} className="hover:bg-gray-50">
                          <TableCell className="font-medium text-gray-900">{item.name}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{item.revenue}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}