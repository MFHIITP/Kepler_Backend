import pool from "../utils/postgresConnection.utils.js";

export const checkTableExists = async (tableName: string): Promise<boolean> => {
    try {
        const query = `SELECT EXISTS (
            SELECT 1 
            FROM information_schema.tables
            WHERE table_schema = 'public'
            AND table_name = $1
        ) AS "exists";`;
        const response = await pool.query(query, [tableName]);
        if(response.rows[0].exists) {
            return true;
        }
        return false;
    }
    catch(error) {
        console.error("Error checking table exists: ", error)
        return false;
    }
}
