import pool from "../../lib/Db";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const result = await pool.query('SELECT * FROM usuario_v2');
            res.status(200).json(result.rows);
        } catch (error) {
            console.error('Error al consultar la base de datos:', error);
            res.status(500).json({ error: 'Error al obtener datos' });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}

