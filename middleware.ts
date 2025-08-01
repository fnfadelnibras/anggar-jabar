import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
    console.log("Middleware running for:", req.nextUrl.pathname)
    console.log("Token exists:", !!req.nextauth.token)
    
    // If user is authenticated and trying to access login page, redirect to admin
    if (req.nextUrl.pathname === "/login" && req.nextauth.token) {
      console.log("Authenticated user accessing login, redirecting to admin")
      return NextResponse.redirect(new URL("/admin", req.url))
    }
    
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to login page without token
        if (req.nextUrl.pathname === "/login") {
          return true
        }
        // Require token for admin routes
        return !!token
      }
    },
  }
)

export const config = {
  matcher: ["/admin/:path*", "/login"]
} 