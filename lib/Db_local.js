//PLUGIN DE POSTGRES
import { Pool } from 'pg';
///BAASE DE DATOS LOCAL DE DOCKER DE BACKENDEXPRESSJS
const pool2 = new Pool({
    user: 'postgres',           // usuario de tu base de datos
    host: '172.23.0.2',      //  host databaseavg o ip del docker 172.23.0.2
    database: 'dictaval',  // Tu base de datos
    password: 'secret',   //contraseña de tu base de datos
    port: 5432,
});
///mesjae del lado del servidor
console.log(pool2);

export default pool2;

