import { Server } from "http";
import Logger from "./utils/logger";

import express, { urlencoded } from "express";
import helmet from "helmet";
import { engine } from "express-handlebars";

const port = parseInt(process.env["PORT"] ?? "5000", 10);

function buildApp(): express.Application {
    const app = express();

    app.use(urlencoded({ extended: false }));
    app.use(helmet());

    app.engine("handlebars", engine());
    app.set("view engine", "handlebars");
    app.set("views", "./views");

    app.get("/", (req, res) => {
        res.render("home");
    })

    return app;
}

async function bootServer(port: number): Promise<Server> {
    const app = buildApp();

    return app.listen(port, () =>
        Logger.success(`Server is up and running on http://localhost:${port}`));
}

bootServer(port);