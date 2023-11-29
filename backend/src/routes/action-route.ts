import { Router } from "express";
import { UserController } from "../controllers/user-controller";
import { Route } from "../types/interfaces/Route";
import { ActionController } from "../controllers/action-controller";

export class ActionRoute implements Route{
    actionController: ActionController;

    constructor(){
        this.actionController = new ActionController();
    }

    getRoutes(): Router {
        return Router()
            .post('/book',
                this.actionController.book())
            .post('/inform',
                this.actionController.inform())
            // .post('/pay'
                // this.actionController.register())
            
    }
}