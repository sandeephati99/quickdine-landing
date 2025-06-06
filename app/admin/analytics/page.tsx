"use client"

import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, DollarSign, Users, Clock, Star } from "lucide-react"
import { useState } from "react"

const mockAnalytics = {
  revenue: {
    today: 15420,
    yesterday: 12350,
    thisWeek: 89750,
    lastWeek: 76200,
    thisMonth: 342500,
    lastMonth: 298600,
  },
  orders: {
    today: 47,
    yesterday: 38,
    thisWeek: 289,
    lastWeek: 251,
    avgOrderValue: 328,
  },
  topItems: [
    { name: "Butter Chicken", orders: 156, revenue: 49920 },
    { name: "Paneer Tikka Masala", orders: 134, revenue: 37520 },
    { name: "Chef's Special Biryani", orders: 89, revenue: 40050 },
    { name: "Garlic Naan", orders: 203, revenue: 20300 },
    { name: "Fresh Lime Soda", orders: 178, revenue: 14240 },
  ],
  tableStats: {
    avgTurnover: 2.3,
    peakHours: "7:00 PM - 9:00 PM",
    avgDiningTime: 45,
  },
}

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("today")

  const getRevenueData = () => {
    switch (timeRange) {
      case "today":
        return {
          current: mockAnalytics.revenue.today,
          previous: mockAnalytics.revenue.yesterday,
          label: "vs yesterday",
        }
      case "week":
        return {
          current: mockAnalytics.revenue.thisWeek,
          previous: mockAnalytics.revenue.lastWeek,
          label: "vs last week",
        }
      case "month":
        return {
          current: mockAnalytics.revenue.thisMonth,
          previous: mockAnalytics.revenue.lastMonth,
          label: "vs last month",
        }
      default:
        return {
          current: mockAnalytics.revenue.today,
          previous: mockAnalytics.revenue.yesterday,
          label: "vs yesterday",
        }
    }
  }

  const revenueData = getRevenueData()
  const revenueChange = ((revenueData.current - revenueData.previous) / revenueData.previous) * 100
  const isPositiveChange = revenueChange > 0

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600">Track your restaurant's performance and insights</p>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">₹{revenueData.current.toLocaleString()}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    {isPositiveChange ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                    <span className={`text-sm ${isPositiveChange ? "text-green-600" : "text-red-600"}`}>
                      {Math.abs(revenueChange).toFixed(1)}% {revenueData.label}
                    </span>
                  </div>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{mockAnalytics.orders.today}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">
                      +
                      {(
                        ((mockAnalytics.orders.today - mockAnalytics.orders.yesterday) /
                          mockAnalytics.orders.yesterday) *
                        100
                      ).toFixed(1)}
                      % vs yesterday
                    </span>
                  </div>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Order Value</p>
                  <p className="text-2xl font-bold text-gray-900">₹{mockAnalytics.orders.avgOrderValue}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">+5.2% vs last week</span>
                  </div>
                </div>
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Star className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Table Turnover</p>
                  <p className="text-2xl font-bold text-gray-900">{mockAnalytics.tableStats.avgTurnover}x</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Clock className="h-4 w-4 text-gray-600" />
                    <span className="text-sm text-gray-600">{mockAnalytics.tableStats.avgDiningTime} min avg</span>
                  </div>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-600">Revenue chart visualization would go here</p>
              </div>
            </CardContent>
          </Card>

          {/* Orders Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Order Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-600">Order volume chart would go here</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Performing Items */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAnalytics.topItems.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-orange-100 text-orange-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.orders} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">₹{item.revenue.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Peak Hours & Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Peak Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-2">{mockAnalytics.tableStats.peakHours}</p>
                <p className="text-gray-600">Busiest dining period</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm text-gray-700">Most popular category</span>
                <Badge className="bg-green-100 text-green-800">Main Course</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-sm text-gray-700">Fastest selling item</span>
                <Badge className="bg-blue-100 text-blue-800">Garlic Naan</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <span className="text-sm text-gray-700">Revenue growth</span>
                <Badge className="bg-orange-100 text-orange-800">+15.2% this month</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
