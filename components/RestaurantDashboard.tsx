'use client'

import { useState } from 'react'
import { AlertCircle, Menu, X, Utensils, ChefHat, CreditCard, DollarSign, Receipt } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { OrdersTab } from './OrdersTab'
import CreateMenu from './CreateMenu'

const activeOrders = [
  { orderId: "ORD006", customerName: "Alice Johnson", items: [
    { name: "Burger", price: 350, quantity: 1 },
    { name: "Fries", price: 150, quantity: 1 }
  ], totalAmount: 500, orderTime: "2023-03-08 14:30" },
  { orderId: "ORD007", customerName: "Bob Smith", items: [
    { name: "Pizza", price: 600, quantity: 1 },
    { name: "Soda", price: 200, quantity: 2 }
  ], totalAmount: 1000, orderTime: "2023-03-08 14:45" },
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

export default function RestaurantDashboard({ approved = true }: { approved?: boolean }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("orders")

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

  const sidebarItems = [
    { id: "orders", name: "Order Stats", icon: Utensils },
    { id: "menu", name: "Menu", icon: ChefHat },
    { id: "settings", name: "Settings", icon: CreditCard },
  ]

  if (!approved) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md shadow-md">
          <CardHeader className="text-center">
            <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
            <CardTitle className="text-2xl font-bold text-gray-900">Application Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-center mb-6">
              Your application is currently under review. We appreciate your patience and will notify you once it's approved.
            </p>
            <Button className="w-full" variant="outline">Check Status</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderMainContent = () => {
    switch (activeTab) {
      case "orders":
        return (
          <>
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

            <OrdersTab 
              activeOrders={activeOrders}
              historicalData={historicalData}
              todayStats={todayStats}
              weeklyMonthlyStats={weeklyMonthlyStats}
            />
          </>
        )
      case "menu":
        return <CreateMenu />
      case "settings":
        return <div>Settings content will go here</div>
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <Utensils className="h-6 w-6 text-primary" />
              <div>
                <h2 className="font-semibold">Restaurant Name</h2>
                <p className="text-xs text-muted-foreground">Dashboard</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          
          <nav className="flex-1 overflow-y-auto p-4">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  setSidebarOpen(false)
                }}
                className={cn(
                  "flex items-center w-full space-x-2 px-4 py-2 rounded-lg mb-1 transition-colors",
                  activeTab === item.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-gray-100 text-gray-700"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b px-4 py-3 flex items-center justify-between lg:justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="container mx-auto space-y-8">
            {/* Alert */}
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Attention Required</AlertTitle>
              <AlertDescription>
                You have BDT 2,450 in pending platform fees. Please clear your dues to avoid any service interruptions.
              </AlertDescription>
            </Alert>

            {renderMainContent()}
          </div>
        </main>
      </div>
    </div>
  )
}