import { Router } from "express";
import productRouter from "../product/product.router";

const router = Router();

const routes = [
    {
        path: "/product",
        route: productRouter
    }
];

routes.forEach((route) => router.use(route.path, route.route));

export const appRouter = router;