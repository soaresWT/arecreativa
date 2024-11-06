import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const protectedRoutes = ["/atividades"];
  if (
    !token &&
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/atividades/lista", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/atividades/:path*", "/conta/:path*", "/login"],
};
