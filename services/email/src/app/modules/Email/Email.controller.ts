import { Request, Response } from "express";
import catchAsync from "../../helpers/catchAsync";
import { emailService } from "./Email.service";
import sendResponse from "../../helpers/response";


const sentEmail = catchAsync(async (req: Request, res: Response) => {
    const { ...payload } = req.body;

    await emailService.sendEmail(payload);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Email Sent Successfully",
    })

});

const getMail = catchAsync(async (req: Request, res: Response) => {
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Email Founded",
        data: await emailService.getMail()
    })
})


export const emailController = {
    sentEmail,
    getMail
}
