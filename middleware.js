import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const publicRoutes = ['/', '/api/webhook'];
const isPublic = createRouteMatcher(publicRoutes);

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default clerkMiddleware({
  afterAuth(auth, req) {
    // Check if we're in development mode
    const isDevelopment = process.env.NODE_ENV === 'development';

    // In development mode, allow access to instructor routes
    if (isDevelopment && req.nextUrl.pathname.startsWith('/instructor')) {
      // Skip all checks and allow access
      return;
    }

    // Handle users who aren't authenticated
    if (!auth.userId && !isPublic(req.url)) {
      return Response.redirect(new URL('/sign-in', req.url));
    }

    // Handle users who are authenticated
    if (auth.userId) {
      const user = auth.user;

      // In development mode, set the role to instructor automatically
      // This helps bypass the role check in the component
      if (isDevelopment) {
        user.publicMetadata = {
          ...user.publicMetadata,
          role: user.publicMetadata?.role || 'instructor',
        };
      }

      const role = user.publicMetadata.role;

      // Protect admin routes
      if (req.nextUrl.pathname.startsWith('/admin') && role !== 'admin') {
        return Response.redirect(new URL('/', req.url));
      }

      // Protect instructor routes (only in production)
      if (
        req.nextUrl.pathname.startsWith('/instructor') &&
        !['admin', 'instructor'].includes(role)
      ) {
        return Response.redirect(new URL('/', req.url));
      }
    }
  },
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
