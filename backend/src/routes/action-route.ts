import { Router } from "express";
import { Route } from "../types/interfaces/Route";
import { ActionController } from "../controllers/action-controller";

export class ActionRoute implements Route{
    actionController: ActionController;

    constructor(){
        this.actionController = new ActionController();
    }

    getRoutes(): Router {
        return Router()
            .post('/api/book',
                this.actionController.book())
            .post('/api/pay',
                this.actionController.pay())
            .post('/api/inform',
                this.actionController.inform())
    }
}