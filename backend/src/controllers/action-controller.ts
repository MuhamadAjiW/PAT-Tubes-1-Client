import { Request, Response } from "express"
import { UserRepository } from '../repository/user-repository';
import { UserRequest } from "../types/UserRequest";
import { BadRequestError } from "../types/errors/BadRequestError";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt"
import { LoginRequest } from "../types/LoginRequest";
import { NotFoundError } from "../types/errors/NotFoundError";
import { UnauthorizedError } from "../types/errors/UnauthorizedError";
import { z } from "zod";
import { HistoryRepository } from "../repository/history-repository";

export class ActionController{
    private historyRepository: HistoryRepository;
    
    constructor(){
        this.historyRepository = new HistoryRepository();
    }

    book(){
        return async(req: Request, res: Response) => {
            // const userBody = UserRequest.safeParse(req.body);
            // if(!userBody.success) throw new BadRequestError(userBody.error.message);
            // const userRequest: UserRequest = userBody.data;

            // const hashedPassword = await bcrypt.hash(userRequest.password, 10);
            // userRequest.password = hashedPassword;

            // const result = await this.userRepository.createUser(userRequest);

            // res.status(StatusCodes.CREATED).json({
            //     message: "History successfully created",
            //     valid: true,
            //     data: result
            // })
        }
    }

    inform(){
        return async(req: Request, res: Response) => {
            // const userBody = UserRequest.safeParse(req.body);
            // if(!userBody.success) throw new BadRequestError(userBody.error.message);
            // const userRequest: UserRequest = userBody.data;

            // const hashedPassword = await bcrypt.hash(userRequest.password, 10);
            // userRequest.password = hashedPassword;

            // const result = await this.userRepository.createUser(userRequest);

            // res.status(StatusCodes.CREATED).json({
            //     message: "History successfully created",
            //     valid: true,
            //     data: result
            // })
        }
    }

}