"use client"

import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { AlertCircle, ArrowUpDown, ChevronDown, ChevronsUpDown, DollarSign, Eye, FileText, MoreHorizontal, Plus, Search, Store } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data
const restaurantsData = [
  { id: 1, name: "Tasty Bites", pendingDues: 2500, lastPayment: "2023-05-15", status: "active" },
  { id: 2, name: "Spice Haven", pendingDues: 1800, lastPayment: "2023-05-20", status: "active" },
  { id: 3, name: "Burger Palace", pendingDues: 3200, lastPayment: "2023-05-10", status: "active" },
  { id: 4, name: "Sushi Express", pendingDues: 900, lastPayment: "2023-05-22", status: "active" },
  { id: 5, name: "Pizza Paradise", pendingDues: 1500, lastPayment: "2023-05-18", status: "active" },
]

const pendingApplications = [
  { id: 101, name: "Green Leaf Cafe", appliedOn: "2023-05-25", cuisine: "Vegan" },
  { id: 102, name: "Taco Town", appliedOn: "2023-05-26", cuisine: "Mexican" },
  { id: 103, name: "Noodle House", appliedOn: "2023-05-24", cuisine: "Asian Fusion" },
]

const platformStats = [
  { name: 'Total Fees', value: 125000 },
  { name: 'Active Restaurants', value: 250 },
  { name: 'New Sign-ups', value: 15 },
  { name: 'Avg. Order Value', value: 450 },
]

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500">Manage restaurants and platform statistics</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add New Restaurant
          </Button>
        </div>

        {/* Alert */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Attention</AlertTitle>
          <AlertDescription>
            There are 3 new restaurant applications awaiting your review.
          </AlertDescription>
        </Alert>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {platformStats.map((stat, index) => (
            <Card key={index} className={`shadow-lg ${
              index === 0 ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
              index === 1 ? 'bg-gradient-to-br from-green-500 to-green-600' :
              index === 2 ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
              'bg-gradient-to-br from-orange-500 to-orange-600'
            }`}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-white">{stat.name}</CardTitle>
                {index === 0 ? <DollarSign className="h-4 w-4 text-white" /> :
                 index === 1 ? <Store className="h-4 w-4 text-white" /> :
                 index === 2 ? <Plus className="h-4 w-4 text-white" /> :
                 <ArrowUpDown className="h-4 w-4 text-white" />}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {index === 0 || index === 3 ? `BDT ${stat.value.toLocaleString()}` : stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="restaurants" className="space-y-6">
          <TabsList>
            <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
            <TabsTrigger value="applications">Pending Applications</TabsTrigger>
          </TabsList>

          <TabsContent value="restaurants">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Restaurant List</CardTitle>
                <CardDescription>Manage restaurants and their pending dues</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center py-4">
                  <Input
                    placeholder="Search restaurants..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Name</TableHead>
                      <TableHead>Pending Dues</TableHead>
                      <TableHead>Last Payment</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {restaurantsData
                      .filter(restaurant => 
                        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((restaurant) => (
                      <TableRow key={restaurant.id}>
                        <TableCell className="font-medium">{restaurant.name}</TableCell>
                        <TableCell>BDT {restaurant.pendingDues.toLocaleString()}</TableCell>
                        <TableCell>{restaurant.lastPayment}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            {restaurant.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Edit Information</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>View Payment History</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Pending Applications</CardTitle>
                <CardDescription>Review and approve new restaurant applications</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Restaurant Name</TableHead>
                      <TableHead>Applied On</TableHead>
                      <TableHead>Cuisine</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingApplications.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell className="font-medium">{application.name}</TableCell>
                        <TableCell>{application.appliedOn}</TableCell>
                        <TableCell>{application.cuisine}</TableCell>
                        <TableCell className="text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline">
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[625px]">
                              <DialogHeader>
                                <DialogTitle>Application Details: {application.name}</DialogTitle>
                                <DialogDescription>
                                  Review the restaurant's information and make a decision.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="name" className="text-right">
                                    Name
                                  </Label>
                                  <Input id="name" value={application.name} className="col-span-3" readOnly />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="cuisine" className="text-right">
                                    Cuisine
                                  </Label>
                                  <Input id="cuisine" value={application.cuisine} className="col-span-3" readOnly />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="applied-on" className="text-right">
                                    Applied On
                                  </Label>
                                  <Input id="applied-on" value={application.appliedOn} className="col-span-3" readOnly />
                                </div>
                                <Collapsible>
                                  <CollapsibleTrigger asChild>
                                    <Button variant="outline" className="w-full justify-between">
                                      View Menu PDF <ChevronDown className="h-4 w-4" />
                                    </Button>
                                  </CollapsibleTrigger>
                                  <CollapsibleContent className="mt-2">
                                    <div className="rounded-md border border-dashed p-8 text-center">
                                      <FileText className="mx-auto h-8 w-8 text-gray-400" />
                                      <p className="mt-2 text-sm text-gray-500">menu.pdf</p>
                                    </div>
                                  </CollapsibleContent>
                                </Collapsible>
                              </div>
                              <DialogFooter>
                                <Button type="submit" className="bg-green-600 hover:bg-green-700">Approve</Button>
                                <Button type="button" variant="outline" className="bg-red-100 text-red-600 hover:bg-red-200">
                                  Reject
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Platform Performance Chart */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Platform Performance</CardTitle>
            <CardDescription>Monthly overview of key metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: 'Jan', revenue: 65000, newRestaurants: 5 },
                    { name: 'Feb', revenue: 59000, newRestaurants: 3 },
                    { name: 'Mar', revenue: 80000, newRestaurants: 8 },
                    { name: 'Apr', revenue: 81000, newRestaurants: 7 },
                    { name: 'May', revenue: 56000, newRestaurants: 4 },
                    { name: 'Jun', revenue: 95000, newRestaurants: 10 },
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="revenue" fill="#8884d8" name="Revenue (BDT)" />
                  <Bar yAxisId="right" dataKey="newRestaurants" fill="#82ca9d" name="New Restaurants" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}