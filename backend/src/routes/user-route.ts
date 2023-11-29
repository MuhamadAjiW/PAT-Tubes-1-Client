import { Router } from "express";
import { UserController } from "../controllers/user-controller";
import { Route } from "../types/interfaces/Route";

export class UserRoute implements Route{
    userController: UserController;

    constructor(){
        this.userController = new UserController();
    }

    getRoutes(): Router {
        return Router()
            .post('/register',
                this.userController.register())
            .post('/login',
                this.userController.login())
            .get('/api/user',
                this.userController.fetchAll())
            .get('/api/user/:identifier',
                this.userController.fetchById())
            .put('/api/user/:identifier',
                this.userController.updateById())
            .delete('/api/user/:identifier',
                this.userController.deleteById())
    }
}