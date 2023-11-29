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

export class UserController{
    private userRepository: UserRepository;
    
    constructor(){
        this.userRepository = new UserRepository();
    }

    register(){
        return async(req: Request, res: Response) => {
            const userBody = UserRequest.safeParse(req.body);
            if(!userBody.success) throw new BadRequestError(userBody.error.message);
            const userRequest: UserRequest = userBody.data;

            const hashedPassword = await bcrypt.hash(userRequest.password, 10);
            userRequest.password = hashedPassword;

            const result = await this.userRepository.createUser(userRequest);

            res.status(StatusCodes.CREATED).json({
                message: "User successfully created",
                valid: true,
                data: result
            })
        }
    }

    login(){
        return async(req: Request, res: Response) => {
            const loginBody = LoginRequest.safeParse(req.body);
            if(!loginBody.success) throw new BadRequestError(loginBody.error.message);
            const loginRequest: LoginRequest = loginBody.data;

            const registered = await this.userRepository.getByEmail(loginRequest.email);
            if(!registered) throw new NotFoundError("User does not exist")

            const passwordMatch = await bcrypt.compare(loginRequest.password, registered.password);
            if(!passwordMatch) throw new UnauthorizedError("Invalid Password")

            // TODO: Implement login
            res.status(StatusCodes.OK).json({
                message: "Login successful",
                valid: true,
                data: registered.user_id
            })
        }
    }

    fetchAll(){
        return async(req: Request, res: Response) => {
            const result = await this.userRepository.getAll();

            res.status(StatusCodes.OK).json({
                message: "Users successfully fetched",
                valid: true,
                data: result
            })
        }
    }

    fetchById(){
        return async(req: Request, res: Response) => {
            const queryId = z.number().int().safeParse(req.params.identifier)
            if(!queryId.success) throw new BadRequestError(queryId.error.message);
            const userId: number = queryId.data;
            
            const result = await this.userRepository.getById(userId);
            if(!result) throw new NotFoundError("User not found")

            res.status(StatusCodes.OK).json({
                message: "User successfully fetched",
                valid: true,
                data: result
            })
        }
    }

    updateById(){
        return async(req: Request, res: Response) => {
            const queryId = z.number().int().safeParse(req.params.identifier)
            if(!queryId.success) throw new BadRequestError(queryId.error.message);
            const userId: number = queryId.data;
            
            const registered = await this.userRepository.getById(userId);
            if(!registered) throw new NotFoundError("User not found")

            const userBody = UserRequest.safeParse(req.body);
            if(!userBody.success) throw new BadRequestError(userBody.error.message);
            const userRequest: UserRequest = userBody.data;

            const result = await this.userRepository.updateUser(userId, userRequest);

            res.status(StatusCodes.OK).json({
                message: "Users successfully updated",
                valid: true,
                data: result
            })
        }
    }

    deleteById(){
        return async(req: Request, res: Response) => {
            const queryId = z.number().int().safeParse(req.params.identifier)
            if(!queryId.success) throw new BadRequestError(queryId.error.message);
            const userId: number = queryId.data;
            
            const registered = await this.userRepository.getById(userId);
            if(!registered) throw new NotFoundError("User not found")

            const result = await this.userRepository.deleteUser(userId);

            res.status(StatusCodes.OK).json({
                message: "Users successfully deleted",
                valid: true,
                data: result
            })
        }
    }
}