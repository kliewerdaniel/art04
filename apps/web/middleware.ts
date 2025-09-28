import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl

    if (pathname.startsWith('/api/admin') && req.nextauth.token?.role !== 'admin') {
      return new Response('Unauthorized', { status: 403 })
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
)

export const config = {
  matcher: ['/dashboard/:path*', '/api/admin/:path*'],
}
