import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "QuickDine - Contactless Restaurant Ordering | QR Code Menu & Payment",
  description:
    "Transform your restaurant with QuickDine's contactless QR code ordering system. Let customers scan, order, pay, and track their food - no app downloads required.",
  keywords:
    "restaurant ordering, QR code menu, contactless dining, restaurant technology, digital menu, food ordering system",
  authors: [{ name: "QuickDine Team" }],
  openGraph: {
    title: "QuickDine - Contactless Restaurant Ordering",
    description: "Contactless ordering, real-time updates, zero app downloads. Perfect for restaurants and pubs.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuickDine - Contactless Restaurant Ordering",
    description: "Transform your restaurant with contactless QR code ordering",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
