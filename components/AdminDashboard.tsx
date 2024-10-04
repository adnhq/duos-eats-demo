'use client'

import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { TrendingUp, DollarSign, Store, Users, ChevronUp, CheckCircle, XCircle, Search, FileText } from 'lucide-react'
import { motion } from 'framer-motion'

// Seeded random number generator
const seededRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

// Generate consistent data
const generateData = (seed: number) => {
  const generateRevenueData = (days: number) => {
    return Array.from({ length: days }, (_, i) => ({
      date: new Date(Date.now() - (days - i - 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      revenue: Math.floor(seededRandom(seed + i) * 5000) + 1000,
    }))
  }

  const generateRestaurantData = () => {
    return [
      { id: '1', name: 'Pizza Palace', cuisine: 'Italian', location: 'New York', joinedDate: '2023-01-15', orders: Math.floor(seededRandom(seed + 1) * 1000) + 500, revenue: Math.floor(seededRandom(seed + 2) * 15000) + 5000 },
      { id: '2', name: 'Noodle House', cuisine: 'Chinese', location: 'San Francisco', joinedDate: '2023-02-20', orders: Math.floor(seededRandom(seed + 3) * 1000) + 500, revenue: Math.floor(seededRandom(seed + 4) * 15000) + 5000 },
      { id: '3', name: 'Steak & Grill', cuisine: 'American', location: 'Chicago', joinedDate: '2023-03-10', orders: Math.floor(seededRandom(seed + 5) * 1000) + 500, revenue: Math.floor(seededRandom(seed + 6) * 15000) + 5000 },
      { id: '4', name: 'Seafood Delight', cuisine: 'Seafood', location: 'Boston', joinedDate: '2023-04-05', orders: Math.floor(seededRandom(seed + 7) * 1000) + 500, revenue: Math.floor(seededRandom(seed + 8) * 15000) + 5000 },
      { id: '5', name: 'Vegan Vibes', cuisine: 'Vegan', location: 'Los Angeles', joinedDate: '2023-05-01', orders: Math.floor(seededRandom(seed + 9) * 1000) + 500, revenue: Math.floor(seededRandom(seed + 10) * 15000) + 5000 },
    ]
  }

  return {
    allRevenueData: generateRevenueData(365),
    restaurantData: generateRestaurantData(),
  }
}

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

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('7d')
  const [searchTerm, setSearchTerm] = useState('')
  const [animationKey, setAnimationKey] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  const initialData = generateData(12345) // Use a fixed seed
  const [revenueData, setRevenueData] = useState(initialData.allRevenueData.slice(-7))
  const [restaurantData, setRestaurantData] = useState(initialData.restaurantData)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value)
    let newData
    switch (value) {
      case '7d':
        newData = initialData.allRevenueData.slice(-7)
        break
      case '1m':
        newData = initialData.allRevenueData.slice(-30)
        break
      case '6m':
        newData = initialData.allRevenueData.slice(-180)
        break
      case '1y':
      case 'all':
        newData = initialData.allRevenueData
        break
      default:
        newData = initialData.allRevenueData.slice(-7)
    }
    setRevenueData(newData)
    setRestaurantData(initialData.restaurantData)
    setAnimationKey(prevKey => prevKey + 1)
  }

  const filteredRestaurants = restaurantData.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-8">Admin Dashboard</h1>
          
          {/* Key metrics */}
          <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
      <Card className="shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden transform hover:-translate-y-1 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-5 w-5" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$123,456</div>
          <p className="text-xs flex items-center mt-1 text-blue-100">
            <ChevronUp className="h-4 w-4 mr-1" />
            12.5% from last month
          </p>
        </CardContent>
      </Card>
      <Card className="shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden transform hover:-translate-y-1 bg-gradient-to-br from-green-500 to-green-600 text-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Restaurants</CardTitle>
          <Store className="h-5 w-5" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">256</div>
          <p className="text-xs flex items-center mt-1 text-green-100">
            <ChevronUp className="h-4 w-4 mr-1" />
            8.2% from last month
          </p>
        </CardContent>
      </Card>
      <Card className="shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden transform hover:-translate-y-1 bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          <TrendingUp className="h-5 w-5" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">15,234</div>
          <p className="text-xs flex items-center mt-1 text-yellow-100">
            <ChevronUp className="h-4 w-4 mr-1" />
            15.3% from last month
          </p>
        </CardContent>
      </Card>
      <Card className="shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden transform hover:-translate-y-1 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-5 w-5" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">45,678</div>
          <p className="text-xs flex items-center mt-1 text-purple-100">
            <ChevronUp className="h-4 w-4 mr-1" />
            5.7% from last month
          </p>
        </CardContent>
      </Card>
    </div>

          {/* Revenue chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
                <CardTitle className="text-xl md:text-2xl font-bold text-gray-800">Revenue Overview</CardTitle>
                <Select value={timeRange} onValueChange={handleTimeRangeChange}>
                  <SelectTrigger className="w-full sm:w-[180px]">
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
                <div className="h-[300px] sm:h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
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
                        stroke="#ffa200" 
                        strokeWidth={3}
                        dot={false}
                        animationDuration={1000}
                        animationEasing="ease-in-out"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pending restaurants */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl font-bold text-gray-800">Restaurants Awaiting Approval</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-gray-600">Name</TableHead>
                        <TableHead className="text-gray-600">Cuisine</TableHead>
                        <TableHead className="text-gray-600 hidden md:table-cell">Location</TableHead>
                        <TableHead className="text-gray-600 hidden lg:table-cell">Applied Date</TableHead>
                        <TableHead className="text-gray-600">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingRestaurants.map((restaurant) => (
                        <TableRow key={restaurant.id} className="hover:bg-gray-50 transition-colors duration-150">
                          <TableCell className="font-medium text-gray-900">{restaurant.name}</TableCell>
                          <TableCell>{restaurant.cuisine}</TableCell>
                          <TableCell className="hidden md:table-cell">{restaurant.location}</TableCell>
                          <TableCell className="hidden lg:table-cell">{restaurant.appliedDate}</TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">View Details</Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
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
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* All restaurants */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl font-bold text-gray-800">All Restaurants</CardTitle>
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
                      className="pl-10 pr-4 py-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-gray-600">Name</TableHead>
                        <TableHead className="text-gray-600 hidden sm:table-cell">Cuisine</TableHead>
                        <TableHead className="text-gray-600 hidden md:table-cell">Location</TableHead>
                        <TableHead className="text-gray-600">Orders ({timeRange})</TableHead>
                        <TableHead className="text-gray-600">Revenue ({timeRange})</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRestaurants.map((restaurant) => (
                        <TableRow key={restaurant.id} className="hover:bg-gray-50 transition-colors duration-150">
                          <TableCell className="font-medium text-gray-900">{restaurant.name}</TableCell>
                          <TableCell className="hidden sm:table-cell">{restaurant.cuisine}</TableCell>
                          <TableCell className="hidden md:table-cell">{restaurant.location}</TableCell>
                          <TableCell>{restaurant.orders}</TableCell>
                          <TableCell>${restaurant.revenue.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}