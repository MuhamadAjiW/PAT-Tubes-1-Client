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
import { BOOKING_SERVER_PUBLIC_URL, BOOKING_SERVER_URL, PAYMENT_SERVER_URL, SERVER_API_KEY } from "../utils/config";
import axios from "axios";
import { BookingRequest } from "../types/BookingRequest";
import { HistoryData } from "../types/HistoryData";
import { PaymentRequest } from "../types/PaymentRequest";
import { url } from "inspector";
import { StandardResponse } from "../types/StandardResponse";

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
                    if(!response.data.valid){

                        console.log(response.data)
                        const url = "/api/book/file?signature=" + response.data.data.signature
                        this.historyRepository.createHistory({
                            kursi_id: bookingRequest.kursiId,
                            acara_id: bookingRequest.acaraId,
                            email: bookingRequest.email,
                            booking_id: response.data.data.bookingId,
                            invoice_number: response.data.data.invoiceNumber,
                            pdf_url: url
                        }, false)

                        res.status(StatusCodes.OK).json({
                            message: "Request returns with a failed booking",
                            valid: true,
                            data: BOOKING_SERVER_PUBLIC_URL + url
                        });
                    }
                    else{
                        res.status(StatusCodes.OK).json({
                            message: "Request successful",
                            valid: true,
                            data: response.data
                        });
                    }

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
            const dataBody = StandardResponse.safeParse(req.body);
            if(!dataBody.success) throw new BadRequestError(dataBody.error.message);
            const dataReceived: StandardResponse = dataBody.data;

            console.log("Payment webhook triggered")
            console.log(dataReceived)
            const url = "/api/book/file?signature=" + dataReceived.data.signature
            console.log(url)

            this.historyRepository.createHistory({
                kursi_id: dataReceived.data.kursiId,
                acara_id: dataReceived.data.acaraId,
                email: dataReceived.data.email,
                booking_id: dataReceived.data.bookingId,
                invoice_number: dataReceived.data.invoiceNumber,
                pdf_url: url
            }, dataReceived.valid)

            res.status(StatusCodes.OK).json({
                message: "Message received",
                valid: true,
                data: null
            })
        }
    }

    pay(){
        return async(req: Request, res: Response) => {
            const paymentBody = PaymentRequest.safeParse(req.body);
            if(!paymentBody.success) throw new BadRequestError(paymentBody.error.message);
            const paymentRequest: PaymentRequest = paymentBody.data;

            const serverUrl = PAYMENT_SERVER_URL + paymentRequest.url;
            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${SERVER_API_KEY}`
            };

            let axiosResponse = await axios.post(serverUrl, { invoiceNumber: paymentRequest.invoiceNumber }, { headers: headers }).then(
                (response) => {
                    console.log(response.data)
                    if(!response.data.valid){
                        res.status(StatusCodes.OK).json({
                            message: "Request returns with a failed payment",
                            valid: false,
                            data: response.data
                        });
                    }
                    else{
                        res.status(StatusCodes.OK).json({
                            message: "Payment successful",
                            valid: true,
                            data: response.data
                        });
                    }

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
}