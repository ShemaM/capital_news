import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtected = createRouteMatcher([
  '/admin(.*)',
]);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default clerkMiddleware(async (auth: () => PromiseLike<{ userId: any; redirectToSignIn: any; }> | { userId: any; redirectToSignIn: any; }, req: any) => {
  if (isProtected(req)) {
    // 1. Destructure the helpers we need
    const { userId, redirectToSignIn } = await auth();

    // 2. Manual check: If no user ID, redirect them
    if (!userId) {
      return redirectToSignIn();
    }
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};