"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Save, Plus, Trash2, Users, Clock, DollarSign, Settings } from "lucide-react"

interface StaffMember {
  id: number
  name: string
  email: string
  role: "kitchen" | "waitstaff" | "manager"
  isActive: boolean
}

const mockStaff: StaffMember[] = [
  { id: 1, name: "Chef Kumar", email: "kumar@spicegarden.com", role: "kitchen", isActive: true },
  { id: 2, name: "Priya Sharma", email: "priya@spicegarden.com", role: "waitstaff", isActive: true },
  { id: 3, name: "Manager Singh", email: "singh@spicegarden.com", role: "manager", isActive: true },
]

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    restaurantName: "Spice Garden",
    serviceCharge: 10,
    gstRate: 5,
    openTime: "11:00",
    closeTime: "23:00",
    maxTables: 25,
    orderTimeout: 30,
    enableNotifications: true,
    autoAcceptOrders: false,
  })

  const [staff, setStaff] = useState<StaffMember[]>(mockStaff)
  const [isAddingStaff, setIsAddingStaff] = useState(false)
  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    role: "waitstaff" as const,
  })

  const handleSaveSettings = () => {
    // Save settings logic here
    console.log("Settings saved:", settings)
  }

  const handleAddStaff = () => {
    if (newStaff.name && newStaff.email) {
      const staffMember: StaffMember = {
        id: Date.now(),
        name: newStaff.name,
        email: newStaff.email,
        role: newStaff.role,
        isActive: true,
      }
      setStaff((prev) => [...prev, staffMember])
      setNewStaff({ name: "", email: "", role: "waitstaff" })
      setIsAddingStaff(false)
    }
  }

  const toggleStaffStatus = (id: number) => {
    setStaff((prev) => prev.map((member) => (member.id === id ? { ...member, isActive: !member.isActive } : member)))
  }

  const removeStaff = (id: number) => {
    setStaff((prev) => prev.filter((member) => member.id !== id))
  }

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
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600">Manage restaurant settings and staff access</p>
          </div>
          <Button
            onClick={handleSaveSettings}
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Restaurant Settings */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Restaurant Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="restaurantName">Restaurant Name</Label>
                  <Input
                    id="restaurantName"
                    value={settings.restaurantName}
                    onChange={(e) => setSettings({ ...settings, restaurantName: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="openTime">Opening Time</Label>
                    <Input
                      id="openTime"
                      type="time"
                      value={settings.openTime}
                      onChange={(e) => setSettings({ ...settings, openTime: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="closeTime">Closing Time</Label>
                    <Input
                      id="closeTime"
                      type="time"
                      value={settings.closeTime}
                      onChange={(e) => setSettings({ ...settings, closeTime: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="maxTables">Maximum Tables</Label>
                  <Input
                    id="maxTables"
                    type="number"
                    value={settings.maxTables}
                    onChange={(e) => setSettings({ ...settings, maxTables: Number.parseInt(e.target.value) || 0 })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5" />
                  <span>Pricing Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="serviceCharge">Service Charge (%)</Label>
                    <Input
                      id="serviceCharge"
                      type="number"
                      value={settings.serviceCharge}
                      onChange={(e) =>
                        setSettings({ ...settings, serviceCharge: Number.parseFloat(e.target.value) || 0 })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="gstRate">GST Rate (%)</Label>
                    <Input
                      id="gstRate"
                      type="number"
                      value={settings.gstRate}
                      onChange={(e) => setSettings({ ...settings, gstRate: Number.parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Order Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="orderTimeout">Order Timeout (minutes)</Label>
                  <Input
                    id="orderTimeout"
                    type="number"
                    value={settings.orderTimeout}
                    onChange={(e) => setSettings({ ...settings, orderTimeout: Number.parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Push Notifications</Label>
                    <p className="text-sm text-gray-600">Get notified of new orders</p>
                  </div>
                  <Switch
                    checked={settings.enableNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, enableNotifications: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-accept Orders</Label>
                    <p className="text-sm text-gray-600">Automatically accept incoming orders</p>
                  </div>
                  <Switch
                    checked={settings.autoAcceptOrders}
                    onCheckedChange={(checked) => setSettings({ ...settings, autoAcceptOrders: checked })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Staff Management */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Staff Management</span>
                  </CardTitle>
                  <Button onClick={() => setIsAddingStaff(true)} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Staff
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Add Staff Form */}
                {isAddingStaff && (
                  <div className="p-4 border-2 border-orange-200 rounded-lg space-y-3">
                    <div>
                      <Label htmlFor="staffName">Name</Label>
                      <Input
                        id="staffName"
                        value={newStaff.name}
                        onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                        placeholder="Enter staff name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="staffEmail">Email</Label>
                      <Input
                        id="staffEmail"
                        type="email"
                        value={newStaff.email}
                        onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <Label htmlFor="staffRole">Role</Label>
                      <Select
                        value={newStaff.role}
                        onValueChange={(value: "kitchen" | "waitstaff" | "manager") =>
                          setNewStaff({ ...newStaff, role: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kitchen">Kitchen Staff</SelectItem>
                          <SelectItem value="waitstaff">Wait Staff</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={handleAddStaff} size="sm">
                        Add Staff
                      </Button>
                      <Button onClick={() => setIsAddingStaff(false)} variant="outline" size="sm">
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                {/* Staff List */}
                <div className="space-y-3">
                  {staff.map((member) => (
                    <div
                      key={member.id}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        member.isActive ? "bg-white" : "bg-gray-50 opacity-60"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div>
                          <p className="font-medium text-gray-900">{member.name}</p>
                          <p className="text-sm text-gray-600">{member.email}</p>
                        </div>
                        <Badge className={getRoleColor(member.role)}>{getRoleLabel(member.role)}</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={member.isActive}
                          onCheckedChange={() => toggleStaffStatus(member.id)}
                          size="sm"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeStaff(member.id)}
                          className="h-8 w-8 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Information */}
            <Card>
              <CardHeader>
                <CardTitle>System Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">QuickDine Version</span>
                  <Badge variant="outline">v2.1.0</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Last Backup</span>
                  <span className="text-sm text-gray-900">2 hours ago</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Storage Used</span>
                  <span className="text-sm text-gray-900">2.3 GB / 10 GB</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Active Tables</span>
                  <span className="text-sm text-gray-900">12 / 25</span>
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-600">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">Reset All Settings</p>
                    <p className="text-sm text-gray-600">Restore default configuration</p>
                  </div>
                  <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                    Reset
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">Export Data</p>
                    <p className="text-sm text-gray-600">Download all restaurant data</p>
                  </div>
                  <Button variant="outline">Export</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
