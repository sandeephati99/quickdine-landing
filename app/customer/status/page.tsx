"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { QrCode, ShoppingCart, Clock, CheckCircle, ChefHat, Bell, ArrowLeft, RefreshCw } from "lucide-react"
import Link from "next/link"

const orderStatuses = [
  {
    id: "received",
    name: "Order Received",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-100",
    description: "Your order has been received",
  },
  {
    id: "preparing",
    name: "Preparing",
    icon: ChefHat,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    description: "Chef is preparing your order",
  },
  {
    id: "ready",
    name: "Ready",
    icon: Bell,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    description: "Your order is ready for pickup",
  },
  {
    id: "served",
    name: "Served",
    icon: CheckCircle,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    description: "Order has been served",
  },
]

export default function OrderStatusPage() {
  const [currentStatus, setCurrentStatus] = useState(1) // 0: received, 1: preparing, 2: ready, 3: served
  const [orderNumber] = useState(`QD${Date.now().toString().slice(-6)}`)
  const [estimatedTime, setEstimatedTime] = useState(15)

  useEffect(() => {
    // Simulate order progress
    const interval = setInterval(() => {
      setCurrentStatus((prev) => {
        if (prev < 3) {
          return prev + 1
        }
        return prev
      })
      setEstimatedTime((prev) => Math.max(0, prev - 1))
    }, 10000) // Update every 10 seconds for demo

    return () => clearInterval(interval)
  }, [])

  const currentStatusInfo = orderStatuses[currentStatus]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-orange-100 sticky top-0 z-40">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/customer">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Order Status</h1>
          </div>
          <Button variant="ghost" size="icon">
            <RefreshCw className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="px-4 py-6 pb-24">
        {/* Order Info */}
        <Card className="border-0 shadow-lg mb-6">
          <CardContent className="p-6 text-center">
            <div
              className={`${currentStatusInfo.bgColor} rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4`}
            >
              <currentStatusInfo.icon className={`h-10 w-10 ${currentStatusInfo.color}`} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentStatusInfo.name}</h2>
            <p className="text-gray-600 mb-4">{currentStatusInfo.description}</p>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-600">Order Number</p>
              <p className="text-xl font-bold text-gray-900">{orderNumber}</p>
            </div>
            {currentStatus < 3 && estimatedTime > 0 && (
              <Badge className="bg-orange-100 text-orange-800">
                <Clock className="h-3 w-3 mr-1" />
                Est. {estimatedTime} min
              </Badge>
            )}
          </CardContent>
        </Card>

        {/* Progress Tracker */}
        <Card className="border-0 shadow-lg mb-6">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-6">Order Progress</h3>
            <div className="space-y-4">
              {orderStatuses.map((status, index) => (
                <div key={status.id} className="flex items-center space-x-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      index <= currentStatus ? `${status.bgColor} ${status.color}` : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <status.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${index <= currentStatus ? "text-gray-900" : "text-gray-400"}`}>
                      {status.name}
                    </p>
                    <p className={`text-sm ${index <= currentStatus ? "text-gray-600" : "text-gray-400"}`}>
                      {status.description}
                    </p>
                  </div>
                  {index <= currentStatus && <CheckCircle className="h-5 w-5 text-green-600" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card className="border-0 shadow-lg mb-6">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Your Order</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">Butter Chicken</p>
                  <p className="text-sm text-gray-600">Qty: 1</p>
                </div>
                <span className="font-semibold text-gray-900">₹320</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">Fresh Lime Soda</p>
                  <p className="text-sm text-gray-600">Qty: 2</p>
                </div>
                <span className="font-semibold text-gray-900">₹160</span>
              </div>
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex justify-between font-semibold text-lg">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">₹552</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Restaurant Info */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Restaurant Details</h3>
            <div className="space-y-2">
              <p className="text-gray-900 font-medium">Spice Garden</p>
              <p className="text-gray-600">Table 12</p>
              <p className="text-gray-600">4 Guests</p>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-orange-100 px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/customer" className="flex flex-col items-center space-y-1">
            <div className="p-2 rounded-lg bg-gray-100">
              <QrCode className="h-5 w-5 text-gray-600" />
            </div>
            <span className="text-xs text-gray-600">Menu</span>
          </Link>
          <Link href="/customer/cart" className="flex flex-col items-center space-y-1">
            <div className="p-2 rounded-lg bg-gray-100">
              <ShoppingCart className="h-5 w-5 text-gray-600" />
            </div>
            <span className="text-xs text-gray-600">Cart</span>
          </Link>
          <div className="flex flex-col items-center space-y-1">
            <div className="p-2 rounded-lg bg-orange-100">
              <Clock className="h-5 w-5 text-orange-600" />
            </div>
            <span className="text-xs text-orange-600 font-medium">Status</span>
          </div>
        </div>
      </nav>
    </div>
  )
}
