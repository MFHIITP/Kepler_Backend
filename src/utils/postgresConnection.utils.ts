import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;

const pool = new Pool ({
    connectionString: process.env.DATABASE_URL,
});

(async() => {
    try {
        const connection = await pool.query("SELECT NOW()");
        console.log("Connection Postgres Successful: ", connection.rows[0].now);
    }
    catch(error) {
        console.log("Connection to Postgres Error: ", error);
    }
})();

export default pool;