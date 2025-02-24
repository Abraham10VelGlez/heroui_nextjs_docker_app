import pool from "../../lib/Db";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        let { u, p } = req.body.values;
        let errores_server = [];
        if (!u || !p) {
            errores_server.push({ message: "Falta información para acompletar la acción" })/// juntando mensajes de lado de servidor    
        }
        if (errores_server.length > 0) {
            res.status(200).json({ message: errores_server }); //mensajes del lado del cliente
        } else {
            try {
                const result = await pool.query('select nombre_usuario,idetallusu,tipo_usuario from usuario_v2  where nombre_usuario = $1 and pasword = $2 ', [u, p]);
                res.status(200).json(result.rows);
            } catch (error) {
                console.error('Error al consultar la base de datos:', error);
                res.status(500).json({ error: 'Error al obtener datos' });
            }
        }

    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
