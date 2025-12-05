import { createPool } from 'mysql2/promise';

const data = {
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    port: process.env.DBPORT,
    database: process.env.DBNAME,
    connectionLimit: 10,
    queueLimit: 0,
    waitForConnections: true,
};

const db = createPool(data);

export default db;

// consultar sobbre mysql2 y los orm // tarea 