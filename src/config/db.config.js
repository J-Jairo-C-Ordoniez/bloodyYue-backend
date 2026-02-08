import { createPool } from 'mysql2/promise';

const data = {
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    port: process.env.DBPORT || 3306,
    database: process.env.DBNAME,
    connectionLimit: 5,
    waitForConnections: true,
    queueLimit: 0,
    ssl: {
        rejectUnauthorized: false
    }
};

const db = createPool(data);

db.getConnection()
    .then(conn => {
        console.log("✅ Conexión a FreeDB establecida exitosamente");
        conn.release();
    })
    .catch(err => {
        console.error("❌ Error conectando a la base de datos:", err.message);
    });

export default db;