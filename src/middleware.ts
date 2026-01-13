import { NextRequest, NextResponse } from "next/server";
import { decrypt, updateSession } from "@/lib/auth";

export async function middleware(request: NextRequest) {
    // 1. Check if it's an /admin route
    if (request.nextUrl.pathname.startsWith('/admin')) {

        // 2. Allow login page
        if (request.nextUrl.pathname === '/admin/login') {
            return NextResponse.next();
        }

        // 3. Verify Session for other admin pages
        const cookie = request.cookies.get('session')?.value;
        const session = cookie ? await decrypt(cookie) : null;

        if (!session || !session.user) {
            // Redirect to Login
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        // 4. Update session expiry if valid (Rolling session)
        return await updateSession(request);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
