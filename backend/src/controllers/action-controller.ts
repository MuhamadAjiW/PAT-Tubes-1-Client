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
import { BOOKING_SERVER_URL, SERVER_API_KEY } from "../utils/config";
import axios from "axios";
import { BookingRequest } from "../types/BookingRequest";
import { AxiosError } from "axios";

export class ActionController{
    private historyRepository: HistoryRepository;
    
    constructor(){
        this.historyRepository = new HistoryRepository();
    }

    book(){
        return async(req: Request, res: Response) => {
            let bookingBody = BookingRequest.safeParse(req.body);
            if(!bookingBody.success) throw new BadRequestError("Bad request parameters");
            const bookingRequest: BookingRequest = bookingBody.data;
            
            const serverUrl = BOOKING_SERVER_URL + "/api/book";
            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${SERVER_API_KEY}`
            };

            let axiosResponse = await axios.post(serverUrl, bookingRequest, { headers: headers }).then(
                (response) => {
                    res.status(StatusCodes.OK).json({
                        message: "Request successful",
                        valid: true,
                        data: response.data
                    });
                }
            ).catch(
                function(error){
                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);

                        res.status(error.response.status).json({
                            message: "Request failed",
                            valid: false,
                            data: error.response.data
                        });
                        return
                    } else if (error.request) {
                        console.log(error.request);
                        throw Error("Request does not reach booking service")
                    } else {
                        throw Error()
                    }
                }
            );
            


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

    pay(){
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