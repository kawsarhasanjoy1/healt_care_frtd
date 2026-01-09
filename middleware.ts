import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  if (accessToken && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }


  if (pathname.startsWith("/dashboard")) {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const decoded: any = jwtDecode(accessToken);

    if (
      decoded?.role === "SUPER_ADMIN" &&
      pathname.startsWith("/dashboard/super_admin")
    ) {
      return NextResponse.next();
    }
    if (decoded?.role === "ADMIN" && pathname.startsWith("/dashboard/admin")) {
      return NextResponse.next();
    }

    if (decoded?.role === "DOCTOR" && pathname.startsWith("/dashboard/doctor")) {
      return NextResponse.next();
    }
    if (decoded?.role === "PATIANT" && pathname.startsWith("/dashboard/patiant")) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
