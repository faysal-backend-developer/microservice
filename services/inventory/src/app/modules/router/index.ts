import { Router } from "express";
import { inventoryRouter } from "../inventory/inventory.routers";

const router = Router();

const routes = [
    {
        path: "/inventory",
        route: inventoryRouter
    }
];

routes.forEach((route) => router.use(route.path, route.route));

export const appRouter = router;