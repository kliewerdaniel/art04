"use client"

import { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

export default function Navigation() {
  const { data: session, status } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-indigo-600">
            Art01
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              Home
            </Link>
            <Link href="/gallery" className="text-gray-600 hover:text-gray-900 transition-colors">
              Gallery
            </Link>

            {session ? (
              <>
                <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Dashboard
                </Link>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">
                    Welcome, {session.user?.name || session.user?.email}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                  >
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <Link
                href="/auth/signin"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Sign in
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link
                href="/"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/gallery"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>

              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <div className="px-3 py-2">
                    <span className="text-sm text-gray-700 block">
                      Welcome, {session.user?.name || session.user?.email}
                    </span>
                    <button
                      onClick={handleSignOut}
                      className="text-gray-600 hover:text-gray-900 transition-colors text-sm mt-1"
                    >
                      Sign out
                    </button>
                  </div>
                </>
              ) : (
                <Link
                  href="/auth/signin"
                  className="block px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
