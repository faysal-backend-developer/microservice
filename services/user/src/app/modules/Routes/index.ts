import { Router } from "express";
import UserRouter from "../User/User.routers";

const router = Router();

const routes = [
    {
        path: "/user",
        route: UserRouter
    }
];

routes.forEach((route) => router.use(route.path, route.route));

export const appRouter = router;