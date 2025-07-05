import axios from "axios";
import { NextFunction, Request, Response } from "express";


// interface UserPayload {
//     id: string;
//     name: string;
//     email: string;
//     role: string;
// }

// interface CustomRequest extends Request {
//     user?: UserPayload;
// }
// user CustomRequest for req:CustomRequest

const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

        if (!req.headers["authorization"]) {
            res.status(400).send({ message: "Unauthorized" })
            return;
        }

        const token = req.headers["authorization"]?.split(" ")[1]
        const { data } = await axios.post("http://localhost:4004/user/verified", {}, {
            headers: {
                "authorization": token
            }
        })

        // console.log(data.data)

        // req.user = {
        //     id: data.data.id,
        //     name: data.data.name,
        //     email: data.data.email,
        //     role: data.data.role,
        // };

        req.headers["x-user-id"] = data.data.id;
        req.headers["x-user-name"] = data.data.name
        req.headers["x-user-email"] = data.data.email
        req.headers["x-user-role"] = data.data.role;


        // console.log(req.headers, "Headers info ");
        next()



    } catch (error) {
        next(error)
    }
}

const middlewares = { auth };
export default middlewares;