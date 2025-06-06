"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, ChefHat, CheckCircle, AlertCircle, Bell } from "lucide-react"

interface Order {
  id: string
  tableNumber: number
  items: Array<{
    name: string
    quantity: number
    customizations?: string[]
  }>
  status: "new" | "preparing" | "ready" | "served"
  timestamp: Date
  totalAmount: number
  guestCount: number
}

const mockOrders: Order[] = [
  {
    id: "ORD001",
    tableNumber: 12,
    items: [
      { name: "Butter Chicken", quantity: 1, customizations: ["Extra spicy", "No onions"] },
      { name: "Garlic Naan", quantity: 2 },
      { name: "Fresh Lime Soda", quantity: 2 },
    ],
    status: "new",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    totalAmount: 580,
    guestCount: 2,
  },
  {
    id: "ORD002",
    tableNumber: 8,
    items: [
      { name: "Paneer Tikka Masala", quantity: 1 },
      { name: "Jeera Rice", quantity: 1 },
      { name: "Craft Beer", quantity: 1 },
    ],
    status: "preparing",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    totalAmount: 520,
    guestCount: 1,
  },
  {
    id: "ORD003",
    tableNumber: 5,
    items: [
      { name: "Chef's Special Biryani", quantity: 2 },
      { name: "Raita", quantity: 2 },
    ],
    status: "ready",
    timestamp: new Date(Date.now() - 25 * 60 * 1000),
    totalAmount: 900,
    guestCount: 4,
  },
]

const statusConfig = {
  new: {
    label: "New Order",
    color: "bg-red-100 text-red-800 border-red-200",
    icon: AlertCircle,
    nextStatus: "preparing",
    nextLabel: "Start Preparing",
  },
  preparing: {
    label: "Preparing",
    color: "bg-orange-100 text-orange-800 border-orange-200",
    icon: ChefHat,
    nextStatus: "ready",
    nextLabel: "Mark Ready",
  },
  ready: {
    label: "Ready",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: Bell,
    nextStatus: "served",
    nextLabel: "Mark Served",
  },
  served: {
    label: "Served",
    color: "bg-green-100 text-green-800 border-green-200",
    icon: CheckCircle,
    nextStatus: null,
    nextLabel: null,
  },
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [newOrderAlert, setNewOrderAlert] = useState(false)

  useEffect(() => {
    // Simulate new orders coming in
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const newOrder: Order = {
          id: `ORD${String(Date.now()).slice(-3)}`,
          tableNumber: Math.floor(Math.random() * 20) + 1,
          items: [{ name: "Sample Item", quantity: 1 }],
          status: "new",
          timestamp: new Date(),
          totalAmount: Math.floor(Math.random() * 500) + 200,
          guestCount: Math.floor(Math.random() * 4) + 1,
        }
        setOrders((prev) => [newOrder, ...prev])
        setNewOrderAlert(true)
        setTimeout(() => setNewOrderAlert(false), 3000)
      }
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const getTimeSince = (timestamp: Date) => {
    const minutes = Math.floor((Date.now() - timestamp.getTime()) / (1000 * 60))
    if (minutes < 1) return "Just now"
    if (minutes === 1) return "1 min ago"
    return `${minutes} mins ago`
  }

  const activeOrders = orders.filter((order) => order.status !== "served")
  const newOrdersCount = orders.filter((order) => order.status === "new").length

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Live Orders</h1>
            <p className="text-gray-600">Kitchen Order Ticket (KOT) Dashboard</p>
          </div>
          {newOrderAlert && (
            <div className="bg-red-100 border border-red-200 text-red-800 px-4 py-2 rounded-lg flex items-center space-x-2 animate-pulse">
              <Bell className="h-4 w-4" />
              <span className="font-medium">New Order Received!</span>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="bg-red-100 p-2 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">New Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{newOrdersCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <ChefHat className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Preparing</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {orders.filter((o) => o.status === "preparing").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Bell className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ready</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {orders.filter((o) => o.status === "ready").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="bg-green-100 p-2 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Served Today</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {orders.filter((o) => o.status === "served").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {activeOrders.map((order) => {
            const config = statusConfig[order.status]
            const StatusIcon = config.icon

            return (
              <Card key={order.id} className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-bold text-lg">Table {order.tableNumber}</h3>
                      <Badge variant="outline" className="text-xs">
                        <Users className="h-3 w-3 mr-1" />
                        {order.guestCount}
                      </Badge>
                    </div>
                    <Badge className={`${config.color} border`}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {config.label}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Order #{order.id}</span>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{getTimeSince(order.timestamp)}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">
                              {item.quantity}x {item.name}
                            </p>
                            {item.customizations && item.customizations.length > 0 && (
                              <div className="mt-1">
                                {item.customizations.map((custom, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs mr-1 mb-1">
                                    {custom}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total Amount */}
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="font-medium text-gray-900">Total</span>
                    <span className="font-bold text-lg">₹{order.totalAmount}</span>
                  </div>

                  {/* Action Button */}
                  {config.nextStatus && (
                    <Button
                      onClick={() => updateOrderStatus(order.id, config.nextStatus as Order["status"])}
                      className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                    >
                      {config.nextLabel}
                    </Button>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {activeOrders.length === 0 && (
          <Card className="p-12 text-center">
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">All caught up!</h3>
            <p className="text-gray-600">No active orders at the moment.</p>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}
