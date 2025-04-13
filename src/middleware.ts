import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwtToken } from "./lib/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  const isValidToken = token && (await verifyJwtToken(token));

  if (pathname.startsWith("/admin") && !isValidToken) {
    return NextResponse.redirect(new URL(`/login`, req.nextUrl.origin));
  }
  if (pathname.startsWith("/login") && isValidToken) {
    return NextResponse.redirect(
      new URL(`/admin/dashboard`, req.nextUrl.origin)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
