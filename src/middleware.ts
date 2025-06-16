import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/", "/auth"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const token = req.cookies.get("token")?.value;
  const adminToken = req.cookies.get("adminToken")?.value;

  // Allow access to public pages
  if (PUBLIC_PATHS.includes(path)) {
    if (path === "/auth" && token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // Admin route protection
  if (path.startsWith("/admin")) {
    if (!adminToken) {
      console.log("Missing adminToken → redirecting to /auth");
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    // Optional: Verify token structure (e.g., decode header for extra paranoia)
    // We'll just trust it's present for now
    return NextResponse.next();
  }

  // Protect all other non-public routes
  if (!token) {
    console.log("Missing token → redirecting to /auth");
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)"],
};
