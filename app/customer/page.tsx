"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  QrCode,
  Search,
  ShoppingCart,
  Plus,
  Star,
  Clock,
  Users,
  Flame,
  Grid3X3,
  List,
  ChefHat,
  TrendingUp,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/cart-context"

const menuCategories = ["All", "Food", "Drinks", "Desserts", "Specials"]

const menuItems = [
  {
    id: 1,
    name: "Butter Chicken",
    description: "Creamy tomato-based curry with tender chicken pieces, served with aromatic basmati rice",
    price: 320,
    image: "/placeholder.svg?height=300&width=400",
    category: "Food",
    isVeg: false,
    spiceLevel: 2,
    rating: 4.5,
    prepTime: "15-20 min",
    isSpecial: true,
    isPopular: true,
    isChefsPick: false,
  },
  {
    id: 2,
    name: "Paneer Tikka Masala",
    description: "Grilled cottage cheese cubes in rich, creamy spiced gravy with bell peppers",
    price: 280,
    image: "/placeholder.svg?height=300&width=400",
    category: "Food",
    isVeg: true,
    spiceLevel: 2,
    rating: 4.3,
    prepTime: "12-15 min",
    isSpecial: false,
    isPopular: false,
    isChefsPick: true,
  },
  {
    id: 3,
    name: "Fresh Lime Soda",
    description: "Refreshing lime with sparkling soda water, fresh mint leaves and a hint of black salt",
    price: 80,
    image: "/placeholder.svg?height=300&width=400",
    category: "Drinks",
    isVeg: true,
    spiceLevel: 0,
    rating: 4.2,
    prepTime: "2-3 min",
    isSpecial: false,
    isPopular: true,
    isChefsPick: false,
  },
  {
    id: 4,
    name: "Chocolate Brownie",
    description: "Warm, fudgy chocolate brownie served with vanilla ice cream and chocolate sauce",
    price: 180,
    image: "/placeholder.svg?height=300&width=400",
    category: "Desserts",
    isVeg: true,
    spiceLevel: 0,
    rating: 4.7,
    prepTime: "5-8 min",
    isSpecial: false,
    isPopular: false,
    isChefsPick: true,
  },
  {
    id: 5,
    name: "Craft Beer",
    description: "Local brewery special wheat beer with citrus notes, perfectly chilled and refreshing",
    price: 220,
    image: "/placeholder.svg?height=300&width=400",
    category: "Drinks",
    isVeg: true,
    spiceLevel: 0,
    rating: 4.4,
    prepTime: "1-2 min",
    isSpecial: false,
    isPopular: true,
    isChefsPick: false,
  },
  {
    id: 6,
    name: "Chef's Special Biryani",
    description: "Aromatic basmati rice layered with tender meat, saffron, and traditional spices",
    price: 450,
    image: "/placeholder.svg?height=300&width=400",
    category: "Specials",
    isVeg: false,
    spiceLevel: 3,
    rating: 4.8,
    prepTime: "25-30 min",
    isSpecial: true,
    isPopular: true,
    isChefsPick: true,
  },
]

export default function CustomerMenu() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"card" | "list">("card")
  const { addToCart, cart } = useCart()

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)

  const CardView = ({ item }: { item: (typeof menuItems)[0] }) => (
    <Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-gradient-to-br from-white to-orange-50/30 hover:scale-[1.02] transform-gpu">
      <div className="relative overflow-hidden">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {item.isPopular && (
            <Badge className="bg-red-600 text-white shadow-lg animate-pulse">
              <TrendingUp className="h-3 w-3 mr-1" />
              Popular Now
            </Badge>
          )}
          {item.isChefsPick && (
            <Badge className="bg-purple-600 text-white shadow-lg">
              <ChefHat className="h-3 w-3 mr-1" />
              Chef's Pick
            </Badge>
          )}
        </div>

        <div className="absolute top-3 right-3">
          {item.isVeg ? (
            <div className="w-6 h-6 border-2 border-green-600 bg-white rounded flex items-center justify-center shadow-lg">
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            </div>
          ) : (
            <div className="w-6 h-6 border-2 border-red-600 bg-white rounded flex items-center justify-center shadow-lg">
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            </div>
          )}
        </div>
      </div>

      <CardContent className="p-5">
        <div className="space-y-3">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-lg text-gray-900 leading-tight">{item.name}</h3>
              {item.spiceLevel > 0 && (
                <div className="flex ml-2">
                  {[...Array(item.spiceLevel)].map((_, i) => (
                    <Flame key={i} className="h-4 w-4 text-red-500" />
                  ))}
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{item.description}</p>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 mr-1 fill-current" />
                <span className="font-medium">{item.rating}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{item.prepTime}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900">₹{item.price}</span>
            </div>
            <Button
              size="sm"
              onClick={() => addToCart(item)}
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const ListView = ({ item }: { item: (typeof menuItems)[0] }) => (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      <CardContent className="p-0">
        <div className="flex">
          <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-110"
            />
            {item.isSpecial && (
              <Badge className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1">Special</Badge>
            )}
          </div>
          <div className="flex-1 p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-gray-900 text-sm">{item.name}</h3>
                  {item.isVeg ? (
                    <div className="w-4 h-4 border-2 border-green-600 flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                  ) : (
                    <div className="w-4 h-4 border-2 border-red-600 flex items-center justify-center">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    </div>
                  )}
                  {item.spiceLevel > 0 && (
                    <div className="flex">
                      {[...Array(item.spiceLevel)].map((_, i) => (
                        <Flame key={i} className="h-3 w-3 text-red-500" />
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Star className="h-3 w-3 text-yellow-400 mr-1" />
                    {item.rating}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {item.prepTime}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">₹{item.price}</span>
              <Button
                size="sm"
                onClick={() => addToCart(item)}
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-4"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-cream-50 to-red-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-orange-100 sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 p-2 rounded-lg shadow-lg">
                <QrCode className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Spice Garden</h1>
                <p className="text-sm text-gray-600">Table 12</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800 shadow-sm">
              <Users className="h-3 w-3 mr-1" />4 Guests
            </Badge>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search delicious dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-orange-200 focus:border-orange-500 rounded-full shadow-sm"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {menuCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap rounded-full ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg"
                      : "border-orange-200 text-orange-600 hover:bg-orange-50"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="flex bg-white rounded-full p-1 shadow-sm border border-orange-100 ml-4">
              <Button
                variant={viewMode === "card" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("card")}
                className={`rounded-full px-3 ${
                  viewMode === "card"
                    ? "bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-orange-600"
                }`}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={`rounded-full px-3 ${
                  viewMode === "list"
                    ? "bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-orange-600"
                }`}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu Items */}
      <main className="px-4 py-6 pb-24">
        {viewMode === "card" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <CardView key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <ListView key={item.id} item={item} />
            ))}
          </div>
        )}

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-orange-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Search className="h-10 w-10 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No dishes found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Try adjusting your search or browse our delicious categories above.
            </p>
          </div>
        )}
      </main>

      {/* Fixed Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-orange-100 px-4 py-3 shadow-lg">
        <div className="flex justify-between items-center">
          <Link href="/customer" className="flex flex-col items-center space-y-1">
            <div className="p-2 rounded-lg bg-orange-100">
              <QrCode className="h-5 w-5 text-orange-600" />
            </div>
            <span className="text-xs text-orange-600 font-medium">Menu</span>
          </Link>
          <Link href="/customer/cart" className="flex flex-col items-center space-y-1 relative">
            <div className="p-2 rounded-lg bg-gray-100">
              <ShoppingCart className="h-5 w-5 text-gray-600" />
            </div>
            {cartItemsCount > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-red-600 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full animate-bounce">
                {cartItemsCount}
              </Badge>
            )}
            <span className="text-xs text-gray-600">Cart</span>
          </Link>
          <Link href="/customer/status" className="flex flex-col items-center space-y-1">
            <div className="p-2 rounded-lg bg-gray-100">
              <Clock className="h-5 w-5 text-gray-600" />
            </div>
            <span className="text-xs text-gray-600">Status</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
