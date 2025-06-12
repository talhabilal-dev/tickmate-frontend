import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/auth", "/"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = req.cookies.get("token")?.value;

  if (PUBLIC_PATHS.includes(path)) {
    return NextResponse.next();
  }

  if (!token) {
    console.log("No token → redirecting to login");
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  if (path === "/auth" || path === "/auth") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)"],
};
