"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, Upload, Search, Filter } from "lucide-react"
import Image from "next/image"

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  category: string
  image: string
  isVeg: boolean
  isAvailable: boolean
  spiceLevel: number
}

const categories = ["Food", "Drinks", "Desserts", "Starters", "Main Course", "Specials"]

const mockMenuItems: MenuItem[] = [
  {
    id: 1,
    name: "Butter Chicken",
    description: "Creamy tomato-based curry with tender chicken pieces",
    price: 320,
    category: "Main Course",
    image: "/placeholder.svg?height=100&width=100",
    isVeg: false,
    isAvailable: true,
    spiceLevel: 2,
  },
  {
    id: 2,
    name: "Paneer Tikka Masala",
    description: "Grilled cottage cheese in rich spiced gravy",
    price: 280,
    category: "Main Course",
    image: "/placeholder.svg?height=100&width=100",
    isVeg: true,
    isAvailable: true,
    spiceLevel: 2,
  },
  {
    id: 3,
    name: "Fresh Lime Soda",
    description: "Refreshing lime with soda and mint",
    price: 80,
    category: "Drinks",
    image: "/placeholder.svg?height=100&width=100",
    isVeg: true,
    isAvailable: false,
    spiceLevel: 0,
  },
]

export default function MenuManagement() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(mockMenuItems)
  const [isAddingItem, setIsAddingItem] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: "",
    description: "",
    price: 0,
    category: "Food",
    isVeg: true,
    isAvailable: true,
    spiceLevel: 0,
  })

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAddItem = () => {
    if (newItem.name && newItem.price) {
      const item: MenuItem = {
        id: Date.now(),
        name: newItem.name,
        description: newItem.description || "",
        price: newItem.price,
        category: newItem.category || "Food",
        image: "/placeholder.svg?height=100&width=100",
        isVeg: newItem.isVeg || false,
        isAvailable: newItem.isAvailable || true,
        spiceLevel: newItem.spiceLevel || 0,
      }
      setMenuItems((prev) => [...prev, item])
      setNewItem({
        name: "",
        description: "",
        price: 0,
        category: "Food",
        isVeg: true,
        isAvailable: true,
        spiceLevel: 0,
      })
      setIsAddingItem(false)
    }
  }

  const handleUpdateItem = () => {
    if (editingItem) {
      setMenuItems((prev) => prev.map((item) => (item.id === editingItem.id ? editingItem : item)))
      setEditingItem(null)
    }
  }

  const handleDeleteItem = (id: number) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id))
  }

  const toggleAvailability = (id: number) => {
    setMenuItems((prev) => prev.map((item) => (item.id === id ? { ...item, isAvailable: !item.isAvailable } : item)))
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Menu Management</h1>
            <p className="text-gray-600">Add, edit, and manage your restaurant menu</p>
          </div>
          <Button
            onClick={() => setIsAddingItem(true)}
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search menu items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add/Edit Item Modal */}
        {(isAddingItem || editingItem) && (
          <Card className="border-2 border-orange-200">
            <CardHeader>
              <CardTitle>{editingItem ? "Edit Menu Item" : "Add New Menu Item"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Item Name</Label>
                  <Input
                    id="name"
                    value={editingItem ? editingItem.name : newItem.name}
                    onChange={(e) => {
                      if (editingItem) {
                        setEditingItem({ ...editingItem, name: e.target.value })
                      } else {
                        setNewItem({ ...newItem, name: e.target.value })
                      }
                    }}
                    placeholder="Enter item name"
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={editingItem ? editingItem.price : newItem.price}
                    onChange={(e) => {
                      const price = Number.parseFloat(e.target.value) || 0
                      if (editingItem) {
                        setEditingItem({ ...editingItem, price })
                      } else {
                        setNewItem({ ...newItem, price })
                      }
                    }}
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingItem ? editingItem.description : newItem.description}
                  onChange={(e) => {
                    if (editingItem) {
                      setEditingItem({ ...editingItem, description: e.target.value })
                    } else {
                      setNewItem({ ...newItem, description: e.target.value })
                    }
                  }}
                  placeholder="Enter item description"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={editingItem ? editingItem.category : newItem.category}
                    onValueChange={(value) => {
                      if (editingItem) {
                        setEditingItem({ ...editingItem, category: value })
                      } else {
                        setNewItem({ ...newItem, category: value })
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="spiceLevel">Spice Level</Label>
                  <Select
                    value={String(editingItem ? editingItem.spiceLevel : newItem.spiceLevel)}
                    onValueChange={(value) => {
                      const spiceLevel = Number.parseInt(value)
                      if (editingItem) {
                        setEditingItem({ ...editingItem, spiceLevel })
                      } else {
                        setNewItem({ ...newItem, spiceLevel })
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">No Spice</SelectItem>
                      <SelectItem value="1">Mild</SelectItem>
                      <SelectItem value="2">Medium</SelectItem>
                      <SelectItem value="3">Hot</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <Switch
                    checked={editingItem ? editingItem.isVeg : newItem.isVeg}
                    onCheckedChange={(checked) => {
                      if (editingItem) {
                        setEditingItem({ ...editingItem, isVeg: checked })
                      } else {
                        setNewItem({ ...newItem, isVeg: checked })
                      }
                    }}
                  />
                  <Label>Vegetarian</Label>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" className="flex-1">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={editingItem ? handleUpdateItem : handleAddItem}
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                >
                  {editingItem ? "Update Item" : "Add Item"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAddingItem(false)
                    setEditingItem(null)
                  }}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className={`${!item.isAvailable ? "opacity-60" : ""}`}>
              <CardContent className="p-4">
                <div className="flex space-x-3">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                    {!item.isAvailable && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-medium">Unavailable</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm">{item.name}</h3>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon" onClick={() => setEditingItem(item)} className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteItem(item.id)}
                          className="h-8 w-8 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-gray-900">₹{item.price}</span>
                        <Badge variant={item.isVeg ? "secondary" : "destructive"} className="text-xs">
                          {item.isVeg ? "Veg" : "Non-Veg"}
                        </Badge>
                      </div>
                      <Switch
                        checked={item.isAvailable}
                        onCheckedChange={() => toggleAvailability(item.id)}
                        size="sm"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <Card className="p-12 text-center">
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600">Try adjusting your search or filters.</p>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}
