import { NextResponse } from "next/server";

export function middleware(req) {
    const token = req.cookies.get("jwt_avg"); // Obtener token de sesión
    //console.log("Token detectado en middleware:", token);

    // Rutas protegidas
    const protectedRoutes = ["/session", "/admin"];

    if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
        return NextResponse.redirect(new URL("/", req.url)); // Redirigir si no hay sesión
    }

    if (!token) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

// Definir en qué rutas se ejecuta el middleware
export const config = {
    matcher: ["/session/:path*", "/admin/:path*"], // Rutas protegidas
};
