import express from "express";

const pkgInfo = require("../package.json");

export async function buildApp(): Promise<express.Application> {
    const app = express();
    // Middleware
    app.disable("x-powered-by");
    app.use((req, res, next) => {
        res.set("server", `trekord/${pkgInfo.version}`);
        next();
    });
    // Routes
    configureRoutes(app);
    return app;
}

function configureRoutes(app: express.Application) {
    app.get("/info", (req, res) => {
        res.json({
            server: "trekord",
            version: pkgInfo.version
        });
    });
}
