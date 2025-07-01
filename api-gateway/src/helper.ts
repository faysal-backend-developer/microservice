import { Express, Request, RequestHandler, Response } from "express"
import services from './services.json'
import axios from "axios";
import { HTTPMethod } from "./app/helpers/types";


const createHandler = (hostname: string, path: string, method: string) => {
    return (async (req: Request, res: Response) => {
        try {
            let url = `${hostname}${path}`;

            req.params && Object.keys(req.params).forEach((param) => {
                url = url.replace(`:${param}`, req.params[param]);
            })
            const { data } = await axios({
                method,
                url,
                data: req.body,
                headers: {
                    origin : "http://localhost:8080", // Adjust the origin as needed
                }
            })

            res.status(200).json(data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return res.status(error.request?.status || 500).json({
                    message: error.message || "Internal Server Error",
                    status: error.request?.status || 500,
                })
            } else {
                return res.status(500).json({
                    message: "Internal Server Error",
                    status: 500,
                })
            }
        }
    }) as RequestHandler;
}

export const configureRouters = (app: Express) => {
    Object.entries(services.services).forEach(([_name, service]) => {
        const hostname = service.url;
        service.routes.forEach((route) => {
            route.methods.forEach((method) => {
                const handler = createHandler(hostname, route.path, method);
                const endPoints = `/api/v1${route.path}`
                app[method as HTTPMethod](endPoints, handler)
            })
        })
    })
} 