import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl;
  const { pathname, search } = url;
  const auth = req.cookies.get('auth')?.value === '1';
  const role = req.cookies.get('role')?.value || 'Employee';

  const protectedPaths = [
    '/dashboard',
    '/tasks',
    '/topics',
    '/posts',
    '/knowledge-base',
  ];
  const isProtected = protectedPaths.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  if (isProtected && !auth) {
    const from = encodeURIComponent(`${pathname}${search || ''}`);
    const loginUrl = new URL(`/login?from=${from}`, req.url);
    return NextResponse.redirect(loginUrl);
  }

  // If already authenticated, keep users away from login/register
  if ((pathname === '/login' || pathname === '/register') && auth) {
    const target = role === 'Manager' ? '/dashboard/manager' : '/dashboard/employee';
    return NextResponse.redirect(new URL(target, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/tasks/:path*',
    '/topics/:path*',
    '/posts/:path*',
    '/knowledge-base/:path*',
    '/login',
    '/register',
  ],
};
