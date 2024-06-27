import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoutes = createRouteMatcher([
  "/:path*",
  "/api/:path*",
  "/sign-in/:path*",
  "/sign-up/:path*",
])

export default clerkMiddleware((auth, req) => {
  if(!isPublicRoutes(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};