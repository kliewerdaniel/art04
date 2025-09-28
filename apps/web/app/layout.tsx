import "@/styles/globals.css"
import { Inter } from "next/font/google"
import { SessionProvider } from "@/components/SessionProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: 'Art01 - Art + Philanthropy Platform',
  description: 'Connect volunteers with homeless artists through mentorship, financial support, and mental health assessments.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
