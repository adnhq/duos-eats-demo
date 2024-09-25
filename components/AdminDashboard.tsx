'use client'

import React, { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { TrendingUp, DollarSign, Store, Users, ChevronUp, CheckCircle, XCircle, Search, FileText } from 'lucide-react'

// Dummy data for the revenue chart
const generateRevenueData = (days: number) => {
  return Array.from({ length: days }, (_, i) => ({
    date: new Date(Date.now() - (days - i - 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    revenue: Math.floor(Math.random() * 5000) + 1000,
  }))
}

const allRevenueData = generateRevenueData(365) // Generate a year's worth of data

// Dummy data for restaurants awaiting approval
const pendingRestaurants = [
  { 
    id: '1', 
    name: 'Tasty Bites', 
    cuisine: 'Italian', 
    location: 'New York', 
    appliedDate: '2023-06-01',
    owner: 'John Doe',
    email: 'john@tastybites.com',
    phone: '(555) 123-4567',
    description: 'Authentic Italian cuisine in the heart of New York City.',
    menuPdf: '/sample-menu.pdf'
  },
  { 
    id: '2', 
    name: 'Spice Garden', 
    cuisine: 'Indian', 
    location: 'Chicago', 
    appliedDate: '2023-06-02',
    owner: 'Priya Patel',
    email: 'priya@spicegarden.com',
    phone: '(555) 234-5678',
    description: 'Bringing the flavors of India to Chicago with our family recipes.',
    menuPdf: '/sample-menu.pdf'
  },
  { 
    id: '3', 
    name: 'Sushi Express', 
    cuisine: 'Japanese', 
    location: 'Los Angeles', 
    appliedDate: '2023-06-03',
    owner: 'Takeshi Yamamoto',
    email: 'takeshi@sushiexpress.com',
    phone: '(555) 345-6789',
    description: 'Fast and fresh sushi made with the highest quality ingredients.',
    menuPdf: '/sample-menu.pdf'
  },
  { 
    id: '4', 
    name: 'Burger Haven', 
    cuisine: 'American', 
    location: 'Houston', 
    appliedDate: '2023-06-04',
    owner: 'Mike Johnson',
    email: 'mike@burgerhaven.com',
    phone: '(555) 456-7890',
    description: 'Juicy, handcrafted burgers that will satisfy any craving.',
    menuPdf: '/sample-menu.pdf'
  },
  { 
    id: '5', 
    name: 'Taco Fiesta', 
    cuisine: 'Mexican', 
    location: 'Miami', 
    appliedDate: '2023-06-05',
    owner: 'Maria Rodriguez',
    email: 'maria@tacofiesta.com',
    phone: '(555) 567-8901',
    description: 'Authentic Mexican street food brought to the beaches of Miami.',
    menuPdf: '/sample-menu.pdf'
  },
]

// Dummy data for all restaurants
const generateRestaurantData = () => {
  return [
    { id: '1', name: 'Pizza Palace', cuisine: 'Italian', location: 'New York', joinedDate: '2023-01-15', orders: Math.floor(Math.random() * 1000) + 500, revenue: Math.floor(Math.random() * 15000) + 5000 },
    { id: '2', name: 'Noodle House', cuisine: 'Chinese', location: 'San Francisco', joinedDate: '2023-02-20', orders: Math.floor(Math.random() * 1000) + 500, revenue: Math.floor(Math.random() * 15000) + 5000 },
    { id: '3', name: 'Steak & Grill', cuisine: 'American', location: 'Chicago', joinedDate: '2023-03-10', orders: Math.floor(Math.random() * 1000) + 500, revenue: Math.floor(Math.random() * 15000) + 5000 },
    { id: '4', name: 'Seafood Delight', cuisine: 'Seafood', location: 'Boston', joinedDate: '2023-04-05', orders: Math.floor(Math.random() * 1000) + 500, revenue: Math.floor(Math.random() * 15000) + 5000 },
    { id: '5', name: 'Vegan Vibes', cuisine: 'Vegan', location: 'Los Angeles', joinedDate: '2023-05-01', orders: Math.floor(Math.random() * 1000) + 500, revenue: Math.floor(Math.random() * 15000) + 5000 },
  ]
}

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('7d')
  const [revenueData, setRevenueData] = useState(allRevenueData.slice(-7))
  const [searchTerm, setSearchTerm] = useState('')
  const [restaurantData, setRestaurantData] = useState(generateRestaurantData())
  const [animationKey, setAnimationKey] = useState(0)

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value)
    let newData
    switch (value) {
      case '7d':
        newData = allRevenueData.slice(-7)
        break
      case '1m':
        newData = allRevenueData.slice(-30)
        break
      case '6m':
        newData = allRevenueData.slice(-180)
        break
      case '1y':
      case 'all':
        newData = allRevenueData
        break
      default:
        newData = allRevenueData.slice(-7)
    }
    setRevenueData(newData)
    setRestaurantData(generateRestaurantData())
    setAnimationKey(prevKey => prevKey + 1)
  }

  const filteredRestaurants = restaurantData.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        {/* Key metrics */}
        <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden border-l-4 border-blue-500 transform hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
              <DollarSign className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">$123,456</div>
              <p className="text-xs text-gray-500 flex items-center mt-1">
                <ChevronUp className="h-4 w-4 text-green-500 mr-1" />
                12.5% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden border-l-4 border-green-500 transform hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Restaurants</CardTitle>
              <Store className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">256</div>
              <p className="text-xs text-gray-500 flex items-center mt-1">
                <ChevronUp className="h-4 w-4 text-green-500 mr-1" />
                8.2% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden border-l-4 border-yellow-500 transform hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Orders</CardTitle>
              <TrendingUp className="h-5 w-5 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">15,234</div>
              <p className="text-xs text-gray-500 flex items-center mt-1">
                <ChevronUp className="h-4 w-4 text-green-500 mr-1" />
                15.3% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden border-l-4 border-purple-500 transform hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
              <Users className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">45,678</div>
              <p className="text-xs text-gray-500 flex items-center mt-1">
                <ChevronUp className="h-4 w-4 text-green-500 mr-1" />
                5.7% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Revenue chart */}
        <Card className="mb-8 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-bold text-gray-800">Revenue Overview</CardTitle>
            <Select value={timeRange} onValueChange={handleTimeRangeChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="1m">Last month</SelectItem>
                <SelectItem value="6m">Last 6 months</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
                <SelectItem value="all">Lifetime</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData} key={animationKey}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis 
                  dataKey="date" 
                  stroke="#64748B"
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <YAxis stroke="#64748B" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFF', borderColor: '#E2E8F0' }}
                  labelStyle={{ color: '#1E293B' }}
                  formatter={(value) => [`$${value}`, 'Revenue']}
                  labelFormatter={(label) => new Date(label).toLocaleDateString()}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#FFC107" 
                  strokeWidth={3}
                  dot={false}
                  animationDuration={1000}
                  animationEasing="ease-in-out"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pending restaurants */}
        <Card className="mb-8 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800">Restaurants Awaiting Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-600">Name</TableHead>
                  <TableHead className="text-gray-600">Cuisine</TableHead>
                  <TableHead className="text-gray-600">Location</TableHead>
                  <TableHead className="text-gray-600">Applied Date</TableHead>
                  <TableHead className="text-gray-600">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingRestaurants.map((restaurant) => (
                  <TableRow key={restaurant.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <TableCell className="font-medium text-gray-900">{restaurant.name}</TableCell>
                    <TableCell>{restaurant.cuisine}</TableCell>
                    <TableCell>{restaurant.location}</TableCell>
                    <TableCell>{restaurant.appliedDate}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">View Details</Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>{restaurant.name} - Application Details</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <label className="text-right font-medium">Owner:</label>
                                <span className="col-span-3">{restaurant.owner}</span>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <label className="text-right font-medium">Email:</label>
                                <span className="col-span-3">{restaurant.email}</span>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <label className="text-right font-medium">Phone:</label>
                                <span className="col-span-3">{restaurant.phone}</span>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <label className="text-right font-medium">Cuisine:</label>
                                <span className="col-span-3">{restaurant.cuisine}</span>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <label className="text-right font-medium">Location:</label>
                                <span className="col-span-3">{restaurant.location}</span>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <label className="text-right font-medium">Description:</label>
                                <span className="col-span-3">{restaurant.description}</span>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <label className="text-right font-medium">Menu:</label>
                                <div className="col-span-3">
                                  <Button variant="outline" size="sm" onClick={() => window.open(restaurant.menuPdf, '_blank')}>
                                    <FileText className="w-4 h-4 mr-2" />
                                    View Menu PDF
                                  </Button>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-end space-x-2">
                              <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button size="sm" variant="destructive">
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* All restaurants */}
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800">All Restaurants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search restaurants..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full md:w-1/2 lg:w-1/3 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-600">Name</TableHead>
                  <TableHead className="text-gray-600">Cuisine</TableHead>
                  <TableHead className="text-gray-600">Location</TableHead>
                  <TableHead className="text-gray-600">Orders ({timeRange})</TableHead>
                  <TableHead className="text-gray-600">Revenue ({timeRange})</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRestaurants.map((restaurant) => (
                  <TableRow key={restaurant.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <TableCell className="font-medium text-gray-900">{restaurant.name}</TableCell>
                    <TableCell>{restaurant.cuisine}</TableCell>
                    <TableCell>{restaurant.location}</TableCell>
                    <TableCell>{restaurant.orders}</TableCell>
                    <TableCell>${restaurant.revenue.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
