import pool from "../../utils/postgresConnection.utils.js";

(async() => {
    const query = `CREATE TABLE IF NOT EXISTS googlegroupsstudentslist (
        id SERIAL PRIMARY KEY,
        student_email VARCHAR(255) NOT NULL,
        group_email VARCHAR(255) NOT NULL,
        expiry_date DATE NOT NULL
    )`;
    try{ 
        const response = await pool.query(query);
        console.log("Created the database for managing students in the google groups");
    }
    catch(error){
        console.error("Error in creating database for managing students in the google groups", error);
    }
})();