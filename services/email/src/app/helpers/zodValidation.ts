import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const zodValidation = (schema: AnyZodObject) =>
    async (req: Request, _res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
                headers: req.headers,
                cookies: req.cookies
            })
            next();
        } catch (error) {
            next(error)
        }
    }
export default zodValidation;