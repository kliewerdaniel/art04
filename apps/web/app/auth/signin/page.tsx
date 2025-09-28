"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [signupName, setSignupName] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get('callbackUrl')
  let redirectTo = '/dashboard'
  if (callbackUrl) {
    try {
      const url = new URL(callbackUrl, location.origin)
      redirectTo = url.pathname
    } catch {
      // fallback to /dashboard
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: redirectTo,
        redirect: true,
      })
    } catch (error) {
      setMessage("An error occurred. Please try again.")
    }

    setIsLoading(false)
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: signupName,
          email: signupEmail,
          password: signupPassword,
        }),
      })

      if (response.ok) {
        setMessage("Account created! You can now sign in.")
        setIsSignUp(false)
        setEmail(signupEmail)
        setPassword(signupPassword)
      } else {
        const data = await response.json()
        setMessage(data.error || "Sign up failed.")
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.")
    }

    setIsLoading(false)
  }

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      const result = await signIn("email", {
        email: signupEmail || email,
        redirect: false,
      })

      if (result?.error) {
        setMessage("Error sending email. Please try again.")
      } else {
        setMessage("Check your email for the sign-in link!")
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to Art01
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Connect with artists and make a difference
          </p>
        </div>

        {isSignUp ? (
          <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
            <div>
              <label htmlFor="signup-name" className="sr-only">
                Name
              </label>
              <input
                id="signup-name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Full name"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="signup-email" className="sr-only">
                Email address
              </label>
              <input
                id="signup-email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="signup-password" className="sr-only">
                Password
              </label>
              <input
                id="signup-password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                {isLoading ? "Creating..." : "Create account"}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(false)}
                className="text-indigo-600 hover:text-indigo-500"
              >
                Back to sign in
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            {/* Password Login */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsSignUp(true)}
                  className="text-green-600 hover:text-green-500"
                >
                  Don't have an account? Sign up
                </button>
              </div>
            </form>

            {/* Magic Link Alternative */}
            <div className="text-center">
              <span className="text-sm text-gray-500">Or</span>
            </div>

            <form onSubmit={handleMagicLink} className="space-y-4">
              <input
                id="magic-email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email for magic link"
                value={signupEmail || email}
                onChange={(e) => {
                  setSignupEmail(e.target.value)
                  if (!email) setEmail(e.target.value)
                }}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isLoading ? "Sending..." : "Send magic link"}
              </button>
            </form>
          </div>
        )}

        {message && (
          <div className={`text-center text-sm ${message.includes("created") || message.includes("link") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </div>
        )}

        <div className="text-center">
          <Link href="/" className="text-indigo-600 hover:text-indigo-500">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
