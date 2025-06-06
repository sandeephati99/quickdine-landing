"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { QrCode, ChefHat, Users, BarChart3, Mail, Smartphone } from "lucide-react"
import { useRouter } from "next/navigation"

const roles = [
  {
    id: "kitchen",
    name: "Kitchen Staff",
    icon: ChefHat,
    description: "Manage orders and kitchen operations",
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: "waitstaff",
    name: "Wait Staff",
    icon: Users,
    description: "Handle table service and customer requests",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "manager",
    name: "Manager",
    icon: BarChart3,
    description: "Full access to analytics and settings",
    color: "bg-purple-100 text-purple-600",
  },
]

export default function AdminLogin() {
  const [selectedRole, setSelectedRole] = useState("")
  const [loginMethod, setLoginMethod] = useState("email")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async () => {
    if (!selectedRole) return

    setIsLoading(true)

    // Simulate login process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Store role in localStorage for demo
    localStorage.setItem("quickdine-admin-role", selectedRole)
    localStorage.setItem(
      "quickdine-admin-user",
      JSON.stringify({
        role: selectedRole,
        email: email || `${selectedRole}@spicegarden.com`,
        name:
          selectedRole === "kitchen" ? "Chef Kumar" : selectedRole === "waitstaff" ? "Priya Sharma" : "Manager Singh",
      }),
    )

    setIsLoading(false)
    router.push("/admin/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-xl">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 p-3 rounded-lg">
              <QrCode className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">QuickDine</h1>
              <p className="text-sm text-gray-600">Staff Portal</p>
            </div>
          </div>
          <CardTitle className="text-xl text-gray-900">Welcome Back</CardTitle>
          <p className="text-gray-600">Sign in to access your dashboard</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Role Selection */}
          <div>
            <Label className="text-sm font-medium text-gray-900 mb-3 block">Select Your Role</Label>
            <div className="space-y-2">
              {roles.map((role) => (
                <div
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedRole === role.id
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 hover:border-orange-300"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${role.color}`}>
                      <role.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{role.name}</p>
                      <p className="text-xs text-gray-600">{role.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Login Method Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setLoginMethod("email")}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                loginMethod === "email" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </button>
            <button
              onClick={() => setLoginMethod("otp")}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                loginMethod === "otp" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Smartphone className="h-4 w-4" />
              <span>OTP</span>
            </button>
          </div>

          {/* Login Form */}
          {loginMethod === "email" ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@restaurant.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" className="mt-1" />
              </div>
            </div>
          ) : (
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1"
              />
            </div>
          )}

          <Button
            onClick={handleLogin}
            disabled={!selectedRole || isLoading}
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-3"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Signing In...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </Button>

          <div className="text-center">
            <a href="#" className="text-sm text-orange-600 hover:text-orange-700">
              Forgot your password?
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
