import "@/styles/globals.css"

export const metadata = {
  title: 'Art01',
  description: 'Art + Philanthropy platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
