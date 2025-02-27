import { authMiddlewareNEXTBACK } from "./middleware";

async function Hello(req, res) {
    ///mensaje del devuelta para el cliente 
    res.status(200).json({ message: "¡Hola desde el backend de Next.js! PARA ABRAHAMVG STUDIOA CON MIDDLAWARE", user: req.user });
}

export default authMiddlewareNEXTBACK(Hello);
