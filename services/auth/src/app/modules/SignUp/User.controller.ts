import { Request, Response } from "express";
import catchAsync from "../../helpers/catchAsync";
import { UserService } from "./User.service";
import sendResponse from "../../helpers/response";
import { User } from "@prisma/client";


const signUpUser = catchAsync(async (req: Request, res: Response) => {
    const { ...payload } = req.body;
    const result = await UserService.signupUser(payload);

    sendResponse<Partial<User>>(res, {
        statusCode: 201,
        success: true,
        message: "User SignUp Successfully",
        data: result
    })
});





//! Login User 

const loginUser = catchAsync(async (req: Request, res: Response) => {

    const ipAddress = (req.headers["x-forward-for"] || req.ip || " ") as string;
    const userAgent = req.headers["user-agent"] || "";
    const { ...payload } = req.body;
    const result = await UserService.loginUser(payload, ipAddress, userAgent);
    sendResponse<string>(res, {
        statusCode: 201,
        success: true,
        message: "User Login Successfully",
        data: result
    })
});


const verifiedToken = catchAsync(async (req: Request, res: Response) => {
    const authorization = req.headers.authorization as string;

    const result = await UserService.verifiedToken(authorization);

    sendResponse<Partial<User> | null>(res, {
        statusCode: 200,
        success: true,
        message: "Authorized",
        data: result
    })
});


const verifyingAccount = catchAsync(async (req: Request, res: Response) => {
    const email = req.headers.email as string;
    const { code } = req.body;
    const result = await UserService.verifyingAccount(code, email);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Account Verify Successful",
        data: result
    })
})

export const UserController = {
    signUpUser,
    loginUser,
    verifiedToken,
    verifyingAccount
}