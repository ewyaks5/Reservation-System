import { getDbConnection } from "../init/db";
import { ResultSetHeader } from "mysql2";

type InsertOperationResult = {
    status: "success" | "fail",
    message: string | null
}

export async function insertUser(user: CustomTypes.User): Promise<InsertOperationResult> {
    const conn = await getDbConnection();


    let [usernames, fields] = await conn.query(
        "SELECT `username` FROM Users WHERE username = ?",
        [user.username]
    );

    // Check if the username is already taken
    if ((<{ username: string }[]>usernames).length > 0) {
        return {
            status: "fail",
            message: "User already exist"
        };
    }

    // Insert user if uesrname is unique
    let [results] = await conn.execute(
        `INSERT INTO Users (firstname, lastname, username, password) 
        VALUES (?, ?, ?, ?)`,
        [
            user.firstname,
            user.lastname,
            user.username,
            user.password
        ]
    );

    if ((<ResultSetHeader>results).affectedRows == 1) {
        return {
            status: "success",
            message: "User succesfully added"
        }
    }

    return {
        status: "fail",
        message: "Error adding user"
    }
}

