import { Express, Request, Response } from "express";
import express from 'express';
import cors from 'cors';
import { SERVER_PORT } from "./utils/config";
import { badRequestErrorHandler, conflictErrorHandler, generalErrorHandler, notFoundErrorHandler, unauthorizedErrorHandler } from './middlewares/error-middleware';
import bodyParser from "body-parser";
import { UserRoute } from './routes/user-route';
import { ActionRoute } from "./routes/action-route";

require("express-async-errors")

export class App{
    server: Express;

    constructor(){
        const userRoute = new UserRoute();
        const actionRoute = new ActionRoute();

        this.server = express();
        this.server.get('/', (req: Request, res: Response) => {
            res.send(`Server setup at ${SERVER_PORT}`);
        });

        this.server.use(
            cors(),
            bodyParser.json(),
            express.json(),
            express.urlencoded({ extended: true }),
            userRoute.getRoutes(),
            actionRoute.getRoutes(),
            notFoundErrorHandler,
            conflictErrorHandler,
            badRequestErrorHandler,
            unauthorizedErrorHandler,
            generalErrorHandler
        )
    }

    run () {
        process.on("uncaughtException", (error) =>{
            console.error("Server encountered an uncaught error: ", error);
            console.log("\n\nServer continues running");
        })

        this.server.listen(SERVER_PORT, () =>{
            console.log(`Server setup at ${SERVER_PORT}`);
        });
    }
}


