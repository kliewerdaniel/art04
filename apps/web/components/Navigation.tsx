"use client"

import { useState } from "react"
import Link from "next/link"

export default function Navigation() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold">
            Art01
          </Link>
          <div className="hidden md:flex space-x-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link href="/gallery" className="text-gray-600 hover:text-gray-900">
              Gallery
            </Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
