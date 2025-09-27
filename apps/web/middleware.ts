import { auth } from "@/lib/auth"

export default auth((req) => {
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/dashboard') && !req.auth) {
    return Response.redirect(new URL('/auth/signin', req.nextUrl))
  }

  if (pathname.startsWith('/api/admin') && req.auth?.user?.role !== 'admin') {
    return new Response('Unauthorized', { status: 403 })
  }
})

export const config = {
  matcher: ['/dashboard/:path*', '/api/admin/:path*'],
}
