import { createPool } from 'mysql2/promise';
import { DB_NAME, DB_HOST, DB_USER, DB_PORT } from '../settings/environments.js';

// Crea el pool de conexiones
const con = createPool({
  database: DB_NAME,
  host: DB_HOST,
  user: DB_USER,
  port: DB_PORT,
});

con.getConnection()
  .then(() => console.log('Conectado a la base de datos'))
  .catch(error => console.error('Hubo un problema al conectar con la base de datos:', error));

export { con };
