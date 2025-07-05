import { Express, Request, RequestHandler, Response } from "express"
import services from './services.json'
import axios from "axios";
import { HTTPMethod } from "./app/helpers/types";
import middlewares from "./middlewares";
import queryString from 'querystring';


// REVIEW Query String 

export const extractCustomHeaders = (headers: Record<string, any>) => {
    const customHeaders: Record<string, any> = {};
    const allowedExactHeaders = ["email", "name", "role"];

    for (const key in headers) {
        const lowerKey = key.toLowerCase();
        if (
            lowerKey.startsWith("x-") ||
            allowedExactHeaders.includes(lowerKey)
        ) {
            customHeaders[key] = headers[key];
        }
    }

    return customHeaders;
};

const createHandler = (hostname: string, path: string, method: string) => {
    return (async (req: Request, res: Response) => {
        try {
            let url = `${hostname}${path}`;


            //*REVIEW - replace Method kivabe kaj kore

            // Add Dynamic Params 
            if (req.params) {
                for (const param in req.params) {
                    url = url.replace(`:${param}`, req.params[param])
                }
            }



            //REVIEW Add Dynamic Query
            if (req.query && Object.keys(req.query).length > 0) {
                // const query2 = new URLSearchParams(req.query as Record<string, string>).toString()
                const query = queryString.stringify(req.query as Record<string, string>);
                url += `?${query}`;

            }
            req.params && Object.keys(req.params).forEach((param) => {
                url = url.replace(`:${param}`, req.params[param]);

            })

            const { data } = await axios({
                method,
                url,
                data: req.body,
                headers: {
                    ...extractCustomHeaders(req.headers),
                    origin: "http://localhost:8080", // Adjust the origin as needed
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


const getMiddleware = (names: string[]): RequestHandler[] => {
    return names.map((name: string) => {
        const mw = middlewares[name as keyof typeof middlewares];

        if (!mw) {
            throw new Error("Middleware Name not Founded !")
        }

        return mw;
    })
}

export const configureRouters = (app: Express) => {
    Object.entries(services.services).forEach(([_name, service]) => {
        const hostname = service.url;

        service.routes.forEach((route) => {
            const middlewaresToApply = getMiddleware(route?.middlewares)
            route.methods.forEach((method) => {
                const handler = createHandler(hostname, route.path, method);
                const endPoints = `/api/v1${route.path}`
                app[method as HTTPMethod](endPoints, ...middlewaresToApply, handler)
            })
        })
    })
} 