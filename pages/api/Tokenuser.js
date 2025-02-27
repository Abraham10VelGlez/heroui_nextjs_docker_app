import jwt from 'jsonwebtoken';
import pool from "../../lib/Db";
import bcrypt from "bcryptjs";

const fn_flag_validacion_users = async (x, y) => {
    let error_captor = [];
    try {
        const resultSQL = await pool.query('select * from  public.valida_logespecial($1,$2);', [y, x]);
        if (resultSQL.rows.length > 0) {
            error_captor.push({ key: 1, passwordxx: resultSQL.rows[0].passwordxx, key2: resultSQL.rows[0].idx, name: resultSQL.rows[0].namex, rolx: resultSQL.rows[0].rolesx })
            return error_captor;
        } else {
            error_captor.push({ key: 0 });
            return error_captor;
        }
    } catch (error) {
        console.log(error);
        error_captor.push({ key: 0 });
        return error_captor;
    }
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        let { u, p } = req.body.values;
        let errores_server = [];
        if (!u || !p) {
            errores_server.push({ ok: false, key: 0 })/// juntando mensajes de lado de servidor    
        }
        if (errores_server.length > 0) {
            res.status(200).json({ message: errores_server }); //mensajes del lado del cliente
        } else {
            ///validacion interna en base de datos
            const resultuser = await fn_flag_validacion_users(u, p);
            //filtro de si trae datos la busqueda
            if (resultuser.length > 0) {
                //filtro de si trae datos que procede si es 0 esta mal todo no hay usuarios en la base de datos con  essas crendenciales de acceso                
                if (resultuser[0].key == 0) {
                    res.status(200).json({ ok: false });
                    //si no, hay un usuario y continuar                    
                } else {
                    // Comparar la contraseña proporcionada con el hash almacenado
                    const match = await bcrypt.compare(p, resultuser[0].passwordxx);
                    //console.log(match);
                    if (match) {//si es true todo en orden y continuar
                        //convertir un char a number
                        const userRole = Number(resultuser[0].rolx);
                        //validacion de json web token  INICIO
                        const token_user = {
                            id: resultuser[0].key2,
                            rol: userRole,
                            users: u,
                            pass: p,
                            namesys: 'NextAbram10$23AVGjs',
                        }
                        const token_ = jwt.sign(token_user, process.env.NEXT_JWT_SECRET_KEY, { expiresIn: '25m' });
                        //enviar rol para definir  url correcta, funcionara si esto es un sito conmultiusuarios
                        //const urlclient = fn_flag_roles_user_(userRole)                        
                        res.status(200).json({ ok: true, avg: token_, urlsess: "/session", resultuser });
                    } else {// si es falso terminar, usuario no reconocido
                        res.status(200).json({ ok: false });
                    }

                }
                //si no, no hay busqueda de sql o tuvo problemas el backend
            } else {

            }

        }

    } else {
        //res.status(405).json({ error:
        //  'Método no permitido' });
        res.status(405).json({ ok: false });
    }

}        