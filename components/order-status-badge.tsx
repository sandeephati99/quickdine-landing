import { Badge } from "@/components/ui/badge"
import { AlertCircle, ChefHat, Bell, CheckCircle } from "lucide-react"

interface OrderStatusBadgeProps {
  status: "new" | "preparing" | "ready" | "served"
  className?: string
}

const statusConfig = {
  new: {
    label: "New Order",
    color: "bg-red-100 text-red-800 border-red-200",
    icon: AlertCircle,
  },
  preparing: {
    label: "Preparing",
    color: "bg-orange-100 text-orange-800 border-orange-200",
    icon: ChefHat,
  },
  ready: {
    label: "Ready",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: Bell,
  },
  served: {
    label: "Served",
    color: "bg-green-100 text-green-800 border-green-200",
    icon: CheckCircle,
  },
}

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
  const config = statusConfig[status]
  const StatusIcon = config.icon

  return (
    <Badge className={`${config.color} border ${className}`}>
      <StatusIcon className="h-3 w-3 mr-1" />
      {config.label}
    </Badge>
  )
}
