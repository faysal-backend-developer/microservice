import { Router } from "express";
import UserRouter from "../SignUp/User.routers";


const AppRouter = Router();

const routes = [
    {
        path: "/user",
        route: UserRouter
    }
];

routes.forEach((route) => AppRouter.use(route.path, route.route));
export default AppRouter;