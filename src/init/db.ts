import mysql from "mysql2/promise";
import Logger from "../utils/logger";

async function dbConnection() {
    const db_host = process.env["DB_HOST"] ?? "localhost";
    const db_name = process.env["DB_NAME"] ?? "db_test";
    const db_username = process.env["DB_USERNAME"] ?? "root";

    const conn = await mysql.createConnection({
        host: db_host,
        user: db_username,
    });

    try {
        await conn.connect();
        
        // Create database if not exists
        await conn.execute(`CREATE DATABASE IF NOT EXISTS ${db_name}`);
        await conn.execute(`USE ${db_name}`);

        // Initialize table
        await conn.execute(`CREATE TABLE IF NOT EXISTS ? (
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            firstname VARCHAR(50) NOT NULL,
            lastname VARCHAR(50) NOT NULL,
            username VARCHAR(30) NOT NULL UNIQUE
        )`, ["Users"]);

    } catch (error) {
        Logger.error("Failed to initialize database");
        process.exit(1);
    }

    return conn;
}


export default dbConnection();