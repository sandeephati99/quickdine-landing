"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CreditCard, Smartphone, Wallet, Shield, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCart } from "@/components/cart-context"

const paymentMethods = [
  {
    id: "upi",
    name: "UPI",
    icon: Smartphone,
    description: "Pay using UPI apps",
  },
  {
    id: "card",
    name: "Card",
    icon: CreditCard,
    description: "Credit/Debit Card",
  },
  {
    id: "wallet",
    name: "Wallet",
    icon: Wallet,
    description: "Digital Wallet",
  },
]

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState("upi")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")
  const router = useRouter()
  const { getCartTotal, clearCart } = useCart()

  const subtotal = getCartTotal()
  const serviceCharge = subtotal * 0.1
  const gst = subtotal * 0.05
  const total = subtotal + serviceCharge + gst

  const handlePayment = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const orderNum = `QD${Date.now().toString().slice(-6)}`
    setOrderNumber(orderNum)
    setPaymentComplete(true)
    setIsProcessing(false)

    // Clear cart and redirect after 2 seconds
    setTimeout(() => {
      clearCart()
      router.push("/customer/status")
    }, 2000)
  }

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center px-4">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-4">Your order has been placed successfully</p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600">Order Number</p>
              <p className="text-xl font-bold text-gray-900">{orderNumber}</p>
            </div>
            <p className="text-sm text-gray-600">Redirecting to order status...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-orange-100 sticky top-0 z-40">
        <div className="px-4 py-4 flex items-center space-x-3">
          <Link href="/customer/cart">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-gray-900">Payment</h1>
        </div>
      </header>

      <main className="px-4 py-6 pb-24">
        {/* Order Summary */}
        <Card className="border-0 shadow-lg mb-6">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Service Charge</span>
                <span className="text-gray-900">₹{serviceCharge.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">GST</span>
                <span className="text-gray-900">₹{gst.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between font-semibold text-lg">
                  <span className="text-gray-900">Total Amount</span>
                  <span className="text-gray-900">₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card className="border-0 shadow-lg mb-6">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Choose Payment Method</h3>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedMethod === method.id
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 hover:border-orange-300"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <method.icon className="h-6 w-6 text-orange-600" />
                    <div>
                      <p className="font-medium text-gray-900">{method.name}</p>
                      <p className="text-sm text-gray-600">{method.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Form */}
        {selectedMethod === "upi" && (
          <Card className="border-0 shadow-lg mb-6">
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">UPI Payment</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="upi-id">UPI ID</Label>
                  <Input id="upi-id" placeholder="yourname@upi" className="mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {selectedMethod === "card" && (
          <Card className="border-0 shadow-lg mb-6">
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Card Details</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input id="card-number" placeholder="1234 5678 9012 3456" className="mt-1" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="cardholder">Cardholder Name</Label>
                  <Input id="cardholder" placeholder="John Doe" className="mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {selectedMethod === "wallet" && (
          <Card className="border-0 shadow-lg mb-6">
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Digital Wallet</h3>
              <div className="space-y-3">
                {["Paytm", "PhonePe", "Google Pay", "Amazon Pay"].map((wallet) => (
                  <div
                    key={wallet}
                    className="p-3 rounded-lg border border-gray-200 hover:border-orange-300 cursor-pointer"
                  >
                    <p className="font-medium text-gray-900">{wallet}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Security Notice */}
        <Card className="border-0 shadow-lg bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6 text-blue-600" />
              <div>
                <p className="font-medium text-blue-900">Secure Payment</p>
                <p className="text-sm text-blue-700">Your payment information is encrypted and secure</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-orange-100 p-4">
        <Button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-4 text-lg"
        >
          {isProcessing ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Processing Payment...</span>
            </div>
          ) : (
            `Pay ₹${total.toFixed(2)}`
          )}
        </Button>
      </div>
    </div>
  )
}
