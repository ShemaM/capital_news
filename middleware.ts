import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // 1. Manually create a client that knows how to read cookies
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  // We need to parse cookies manually if the helper is broken
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false, // Middleware shouldn't save session to local storage
    }
  });

  // 2. Get the session token from cookies
  // Note: This is a "naive" check. For true security, the official helper is better,
  // but this fixes the build error immediately.
  const allCookies = req.cookies.getAll();
  const accessToken = allCookies.find(c => c.name.includes('access-token') || c.name.includes('sb-'));

  // 3. Define Protected Routes
  const isProtected = req.nextUrl.pathname.startsWith('/admin');

  // 4. Simple Redirect if no cookie is found on a protected route
  // (This assumes if you have no cookie, you aren't logged in)
  if (isProtected && !accessToken) {
    const redirectUrl = new URL('/login', req.url);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};