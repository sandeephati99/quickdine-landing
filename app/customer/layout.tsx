import type React from "react"
import { CartProvider } from "@/components/cart-context"

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <CartProvider>{children}</CartProvider>
}
