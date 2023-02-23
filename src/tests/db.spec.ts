import assert from "assert"
import { insertUser } from "../utils/db-operations"

describe("Database Operations", () => {
    describe("User Insertion", () => {
        it("It should return status fail if user does exist", async () => {
            let user: CustomTypes.User = {
                firstname: "Rens",
                lastname: "Saladaga",
                username: "ewyaks",
                password: "123456"
            };

            const { status } = await insertUser(user);
            assert.equal(status, "fail");
        })
    });
})