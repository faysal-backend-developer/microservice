import { Request, Response } from "express";
import catchAsync from "../../helpers/catchAsync";
import { UserService } from "./User.service";
import sendResponse from "../../helpers/response";
import { User } from "@prisma/client";
import { TField } from "../../helpers/types";

const createUser = catchAsync(async (req: Request, res: Response) => {
    const { ...payload } = req.body
    const result = await UserService.create(payload);

    sendResponse<User>(res, {
        statusCode: 201,
        success: true,
        message: "User created successfully",
        data: result
    })
})

const findUser = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.findUser();

    sendResponse<User[]>(res, {
        statusCode: 200,
        success: true,
        message: "User Find Successfully",
        data: result
    })
})

const findUserById = catchAsync(async (req: Request, res: Response) => {

    const { id } = req.params;
    const field = req.query.field as TField;

    const result = await UserService.findUserById(id, field);

    sendResponse<User>(res, {
        statusCode: 200,
        success: true,
        message: "User Find Done",
        data: result
    })
})

const updateUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const field = req.query.field as TField;
    const { ...payload } = req.body;

    const result = await UserService.updateUser(id, field, payload);

    sendResponse<Partial<User>>(res, {
        statusCode: 201,
        success: true,
        message: "User Updated Done",
        data: result
    })
})

const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const field = req.query.field as TField;

    const result = await UserService.deleteUser(id, field);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User Deleted Done",
        data: result
    })
})


export const UserController = {
    createUser,
    findUser,
    findUserById,
    updateUser,
    deleteUser
}