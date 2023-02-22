import mysql from "mysql2/promise";
import mysql2 from "mysql2";

import Logger from "../utils/logger";
import fs from "fs";
import { MysqlError } from "mysql";

export const db_host = process.env["DB_HOST"] ?? "localhost";
export const db_name = process.env["DB_NAME"] ?? "db_test";
export const db_username = process.env["DB_USERNAME"] ?? "root";

async function initDB() {
    try {
        const conn = await mysql.createConnection({
            host: db_host,
            user: db_username,
        });

        await conn.connect();

        // Create database if not exists
        await conn.execute(`CREATE DATABASE IF NOT EXISTS ${db_name}`);
        await conn.query(`USE ${db_name}`);

        // Initialize table
        await conn.query({
            sql: fs.readFileSync("./sql/init-tables.sql", "utf-8"),
        });

        conn.end();
    } catch (error) {
        Logger.error("Failed to initialize database");
        Logger.error(`${(<MysqlError>error).code}: ${(<MysqlError>error).message}`);
        process.exit(1);
    }

}
export async function getDbConnection() {
    let conn: mysql.Connection;

    try {
       conn = await mysql.createConnection({
            host: db_host,
            user: db_username,
            database: db_name
        });
        await conn.connect();
    } catch (error) {
        Logger.error(`${(<MysqlError>error).code}: ${(<MysqlError>error).message}`);
        process.exit(1);
    }
    return conn;
}

export default initDB;