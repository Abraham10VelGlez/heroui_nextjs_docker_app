//PLUGIN DE POSTGRES
import { Pool } from 'pg';
///BAASE DE DATOS ONLINE DEL SERVIDOR
const pool = new Pool({
    user: 'postgres',           // usuario de tu base de datos
    host: '10.10.68.31',      //  host
    database: 'dictamun2428',  // Tu base de datos
    password: 'j7cr3a',   //contraseña de tu base de datos
    port: 5432,
});
///mesjae del lado del servidor
///console.log(pool);

export default pool;
