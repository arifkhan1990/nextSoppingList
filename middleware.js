export { default } from "next-auth/middleware"

export const config = { matcher: ["/user/:path*","/item/:path*", "/api/users:path*"] }