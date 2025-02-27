import pool from "../../lib/Db";
import bcrypt from "bcryptjs";

/// CREACION DE NUEVO USUARIO.

const fn_flag_new_user_especial = async (namex, hashedPassword) => {
    let errores_lado_server2 = [];
    try {
        //const result = await functionvalidatio_connection_postgres.query(`select * from  public.validauser( $1, $2, $3)`, [namex, hashedPassword, emailx]);
        const result = await pool.query(`select * from  public.valida_logespecial( $1, $2)`, [namex, hashedPassword]);
        if (result.rows.length > 0) {
            //si existe ajunta un mensaje del servidor para al final devolver a cliente                
            console.log("Este correo ya existe");///mensaje de lado de servidor
            errores_lado_server2.push({ key: 0 });
            return errores_lado_server2;
        } else {
            //si no existe un email repetiodo o usuario agregarlo como nuevo             
            try {
                const newuser = await pool.query('INSERT INTO public.usuario_v2 (nombre_usuario, pasword, tipo_usuario, activo, idetallusu, caducidad) VALUES($1, $2, $3, $4, $5, $6) RETURNING idetallusu, nombre_usuario, pasword', [namex, hashedPassword, 100, false, 10001, 100]);
                if (newuser.rows.length > 0) {
                    errores_lado_server2.push({ key: 1, data: newuser.rows });///mensaje para lado del cliente
                    return errores_lado_server2;
                }
            } catch (error) {
                console.error("Error al insertar usuario:", error);
                return res.status(500).json({ key: 0 });
            }
        }
    } catch (error) {
        console.error("Error al insertar usuario:", error);
        return res.status(500).json({ key: 0 });
    }
}


export default async function handler(req, res) {
    if (req.method === 'POST') {
        //console.log(req.body.values);    
        let { u, p } = req.body.values;
        let errores_server = [];
        if (!u || !p) {
            errores_server.push({ ok: false })/// juntando mensajes de lado de servidor    
        }
        if (errores_server.length > 0) {
            res.status(200).json({ ok: false }); //mensajes del lado del cliente
        } else {
            //vamos a encrytar la contraseña para posteriormente guardar en postgresql
            let hashedPassword = await bcrypt.hash(p, 12);
            //ahora encryptado datos es momento de validar datos con la base de datos
            try {
                const avg = await fn_flag_new_user_especial(u, hashedPassword)
                /**************************************************************  resultado final 
                 * 
                 * asi esta el inssert 
                 * {
  "values": {
    "u": "chicopython@live.com.mx",
    "p": "$secr4Toa"
  }
}
                 * 
                 * 
                 * asi sale como resultado
                {
    "avg": [
        {
            "key": 1,
            "data": [
                {
                    "idetallusu": 10001,
                    "nombre_usuario": "chicopython@live.com.mx",
                    "pasword": "$2b$12$Nnw7yRYCBde9t.RBiuYJx.Z1iikpgTuIkl38HMmE1gYWddhxdDMv6"
                }
            ]
        }
    ]
}
                */
                return res.status(200).json({ avg });///mensaje para lado del cliente
            } catch (error) {
                console.log(error);
                return res.status(200).json({ ok: false });///mensaje para lado del cliente
            }

        }

    } else {
        //res.status(405).json({ error: 'Método no permitido' });
        res.status(405).json({ ok: false });
    }
} 