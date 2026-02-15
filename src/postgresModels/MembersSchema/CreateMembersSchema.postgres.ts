import pool from "../../utils/postgresConnection.utils.js";

(async () => {
    const query = `CREATE TABLE IF NOT EXISTS members (
        teamName VARCHAR(255)[] NOT NULL,
        position VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        phoneNumber VARCHAR(255) NOT NULL,
        emailId VARCHAR(255) NOT NULL,
        degree VARCHAR(255) NOT NULL,
        linkedIn VARCHAR(255),
        description TEXT,
        PRIMARY KEY (emailId)
    )`
    try{
        const response = await pool.query(query);
        console.log("Members Schema created successfully", response);
        const createQueryIndex = `CREATE INDEX IF NOT EXISTS idx_team_name_gin ON members USING GIN (teamName)`; 
        await pool.query(createQueryIndex);
        console.log("Created index on the teamName column Successfully");
    }
    catch(error) {
        console.error("Error creating members Schema", error);
    }
})();