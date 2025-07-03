import { Response } from "express";

interface ApiResponse<T> {
    statusCode: number;
    success: true;
    message: string;
    data?: T | null;
    meta?: {
        page?: number;
        limit?: number;
        total?: number;
    };

}

const sendResponse = <T>(res: Response, payload: ApiResponse<T>): void => {
    const { statusCode, success, message, data, meta } = payload;

    res.status(statusCode).json({
        success,
        message,
        data: data || null,
        meta: meta || null
    });
};

export default sendResponse;