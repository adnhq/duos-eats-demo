// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { decrypt } from "./lib/session";

// // This function can be marked `async` if using `await` inside
// export async function middleware(request: NextRequest) {
//   const cookie = (await cookies()).get("session")?.value;
//   const session = await decrypt(cookie);

//   if (!session?.id) return NextResponse.redirect(new URL("/", request.url));

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/restaurant/:path", "/admin/:path"],
// };
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "./lib/session";

export async function middleware(request: NextRequest) {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.id) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/restaurant")) {
    if (session.role !== "restaurant") {
      // If not a restaurant user, redirect to home
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (pathname.startsWith("/admin")) {
    if (session.role !== "admin") {
      // If not an admin user, redirect to home
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (pathname.startsWith("/users")) {
    if (session.role !== "user") {
      // If not an admin user, redirect to home
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/restaurant/:path*", "/admin/:path*", "/users/:path*"],
};
