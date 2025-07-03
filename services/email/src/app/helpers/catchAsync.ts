import { NextFunction, Request, RequestHandler, Response } from "express";

const catchAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>): RequestHandler => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            next(error)
        }
    }
};


export default catchAsync;