import { Server } from "http";
import Logger from "./utils/logger";
import express, { urlencoded } from "express";
import helmet from "helmet";
import { engine } from "express-handlebars";

import initDB from "./init/db";
import initRoutes from "./routes";

const PORT = parseInt(process.env["PORT"] ?? "5000", 10);

function buildApp(): express.Application {
    const app = express();

    app.use(urlencoded({ extended: false }));
    app.use(helmet());

    app.engine("handlebars", engine());
    app.set("view engine", "handlebars");
    app.set("views", "./views");

    app.use(express.static("static"));

    initRoutes(app);

    return app;
}

async function bootServer(port: number): Promise<Server> {
    const app = buildApp();

    Logger.info("Initializing database");
    await initDB();
    Logger.success("Database successfully connected");

    return app.listen(port, () =>
        Logger.success(`Server is up and running on http://localhost:${port}`));
}

bootServer(PORT);
