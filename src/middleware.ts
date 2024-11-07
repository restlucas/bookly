import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutes = [
  "/scheduling",
  "/dashboard",
  "/professional-profile",
  "/schedule",
  "/professionals",
  "/favorites",
  "/account",
];

export async function middleware(req: any) {
  const token = await getToken({ req });

  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route),
  );

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: protectedRoutes.map((route) => `${route}/:path*`),
};