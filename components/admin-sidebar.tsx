"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { QrCode, BarChart3, ChefHat, Users, Settings, LogOut, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface AdminSidebarProps {
  user: any
  isOpen: boolean
  onClose: () => void
  onLogout: () => void
}

const navigation = [
  {
    name: "Live Orders",
    href: "/admin/dashboard",
    icon: ChefHat,
    roles: ["kitchen", "waitstaff", "manager"],
  },
  {
    name: "Menu Management",
    href: "/admin/menu",
    icon: QrCode,
    roles: ["manager"],
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
    roles: ["manager"],
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
    roles: ["manager"],
  },
]

export function AdminSidebar({ user, isOpen, onClose, onLogout }: AdminSidebarProps) {
  const pathname = usePathname()

  const filteredNavigation = navigation.filter((item) => (user?.role ? item.roles.includes(user.role) : false))

  const getRoleColor = (role: string) => {
    switch (role) {
      case "kitchen":
        return "bg-orange-100 text-orange-800"
      case "waitstaff":
        return "bg-blue-100 text-blue-800"
      case "manager":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "kitchen":
        return "Kitchen Staff"
      case "waitstaff":
        return "Wait Staff"
      case "manager":
        return "Manager"
      default:
        return role
    }
  }

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 p-2 rounded-lg">
              <QrCode className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">QuickDine</h1>
              <p className="text-xs text-gray-600">Admin Portal</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center">
              <Users className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{user?.name}</p>
              <Badge className={`${getRoleColor(user?.role)} text-xs`}>{getRoleLabel(user?.role)}</Badge>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-2">
          {filteredNavigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "bg-orange-100 text-orange-600" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
                onClick={onClose}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-6 border-t border-gray-200">
          <Button
            onClick={onLogout}
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )
}
