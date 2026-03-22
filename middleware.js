import { NextResponse } from 'next/server';

export async function middleware(req) {
  // Allow the request through and rely on client-side session checks in AuthGuard.
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup'],
};
