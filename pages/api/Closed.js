import { authMiddlewareNEXTBACK2 } from "./middleware2";

async function handler(req, res) {
    if (req.method === "POST") {
        // Eliminar la cookie de sesión estableciendo su expiración en el pasado
        res.setHeader("Set-Cookie", "jwt_avg=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict");
        res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");        
        return res.status(200).json({ ok: true, message: "Sesión cerrada" });
    } else {
        return res.status(405).json({ error: "Método no permitido" });
    }
}

export default authMiddlewareNEXTBACK2(handler)