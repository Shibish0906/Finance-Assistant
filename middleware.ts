/**
 * middleware.ts
 *
 * Sets up Clerk middleware that protects dashboard routes and API endpoints.
 * If a user is unauthenticated and visits `/dashboard*` they will be
 * redirected to `/sign-in`.
 */
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware(async (auth, req) => {
  // Log incoming requests during development for debugging.
  // eslint-disable-next-line no-console
  console.log("[middleware] hit ->", req.nextUrl.pathname);

  const session = await auth();
  const userId = (session as any)?.userId;

  if (!userId && req.nextUrl.pathname.startsWith("/dashboard")) {
    return Response.redirect(new URL("/sign-in", req.url));
  }
});

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
