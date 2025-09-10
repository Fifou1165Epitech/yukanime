import { NextResponse, NextRequest } from 'next/server'
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

// This function can be marked `async` if using `await` inside
export default async function middleware(request: NextRequest) {

    const session = await auth.api.getSession({
        headers: await headers()
    })

	if (!session) {
		return NextResponse.redirect(new URL("/auth/sign-in", request.url));
	}
	return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: '/account',
}