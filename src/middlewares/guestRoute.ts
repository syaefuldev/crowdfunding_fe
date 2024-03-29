import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { MiddlewareFactory } from "./stackHandler";

export const guestRoute: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const cookie = cookies();
    const token = cookie.get("token")?.value;

    const startWith = (url: string) => {
      return request.nextUrl.pathname.startsWith(url);
    };
    const included = (url: string) => {
      return request.nextUrl.pathname === url;
    };

    if (
      token === undefined &&
      (startWith("/dashboard") ||
        included("/register/upload") ||
        included("/register/success"))
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return next(request, _next);
  };
};
