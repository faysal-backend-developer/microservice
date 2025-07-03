import { Router } from "express";
import EmailRouter from "../Email/Email.routers";


const AppRouter = Router();

const routes = [
    {
        path: "/email",
        route: EmailRouter
    }
];

routes.forEach((route) => AppRouter.use(route.path, route.route));
export default AppRouter;