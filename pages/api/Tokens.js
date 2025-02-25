import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const username = "abraham";
            const password = "abra122025";

            // Verificar que la clave secreta está definida
            if (!process.env.NEXT_JWT_SECRET_KEY) {
                return res.status(500).json({
                    ok: false,
                    message: 'La clave secreta no está definida',
                });
            }

            const tokenData = {
                users: username,
                pass: password,
                namesys: 'AVGStudioA',
            };

            // Crear el token usando los datos del usuario logueado y la llave secreta
            const token = jwt.sign(tokenData, process.env.NEXT_JWT_SECRET_KEY, { expiresIn: '1h' });        

            // Respuesta exitosa
            res.status(200).json({
                ok: true,
                message: 'Usuario correcto, continuar',
                data: token,
            });
        } catch (error) {
            console.error('Error al crear el token:', error);
            res.status(500).json({
                ok: false,
                message: 'Error al crear el token',
            });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}