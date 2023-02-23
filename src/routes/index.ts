import express from "express";

export default function initRoutes(app: express.Application) {
    
    app.get("/", async (req, res) => {
        res.render("home");
    });
}