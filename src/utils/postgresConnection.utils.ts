import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL
});

(async () => {
    try {
        const connection = await pool.query("SELECT NOW()");
        console.log("Postgres connection successful: ", connection.rows[0].now)
    }
    catch (error) {
        console.error("Postgres connection error: ", error);
    }
})();

export default pool;