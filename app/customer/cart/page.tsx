"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { QrCode, ShoppingCart, Plus, Minus, Trash2, Clock, ArrowLeft, CreditCard } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/cart-context"

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart()

  const subtotal = getCartTotal()
  const serviceCharge = subtotal * 0.1 // 10% service charge
  const gst = subtotal * 0.05 // 5% GST
  const total = subtotal + serviceCharge + gst

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-md border-b border-orange-100 sticky top-0 z-40">
          <div className="px-4 py-4 flex items-center space-x-3">
            <Link href="/customer">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Your Cart</h1>
          </div>
        </header>

        <div className="flex flex-col items-center justify-center h-96 px-4">
          <div className="bg-orange-100 rounded-full p-6 mb-4">
            <ShoppingCart className="h-12 w-12 text-orange-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 text-center mb-6">Add some delicious items from our menu</p>
          <Link href="/customer">
            <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
              Browse Menu
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-orange-100 sticky top-0 z-40">
        <div className="px-4 py-4 flex items-center space-x-3">
          <Link href="/customer">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-gray-900">Your Cart</h1>
          <Badge className="bg-orange-100 text-orange-800 ml-auto">
            {cart.length} {cart.length === 1 ? "item" : "items"}
          </Badge>
        </div>
      </header>

      {/* Cart Items */}
      <main className="px-4 py-6 pb-32">
        <div className="space-y-4 mb-6">
          {cart.map((item) => (
            <Card key={item.id} className="border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex space-x-3">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm">{item.name}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900">₹{item.price * item.quantity}</span>
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8 border-orange-200"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-semibold text-gray-900 min-w-[20px] text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 border-orange-200"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bill Summary */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Bill Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Service Charge (10%)</span>
                <span className="text-gray-900">₹{serviceCharge.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">GST (5%)</span>
                <span className="text-gray-900">₹{gst.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between font-semibold text-lg">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-orange-100 p-4">
        <Link href="/customer/payment">
          <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-4 text-lg">
            <CreditCard className="h-5 w-5 mr-2" />
            Proceed to Pay ₹{total.toFixed(2)}
          </Button>
        </Link>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-16 left-0 right-0 bg-white border-t border-orange-100 px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/customer" className="flex flex-col items-center space-y-1">
            <div className="p-2 rounded-lg bg-gray-100">
              <QrCode className="h-5 w-5 text-gray-600" />
            </div>
            <span className="text-xs text-gray-600">Menu</span>
          </Link>
          <div className="flex flex-col items-center space-y-1">
            <div className="p-2 rounded-lg bg-orange-100">
              <ShoppingCart className="h-5 w-5 text-orange-600" />
            </div>
            <span className="text-xs text-orange-600 font-medium">Cart</span>
          </div>
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
