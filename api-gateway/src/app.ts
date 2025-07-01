import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { configureRouters } from './helper';
const app: Express = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min. 
    max: 100,
    handler: (_req, res) => {
        res.status(429).json({
            message: "Too Many requests, please try again later."
        })
    }
});


app.get("/health", (_req, res) => {
    res.status(200).json({ status: "UP" });
});


// Apply rate limiting to all API routes
app.use("/api", limiter);
// configureRouters is a function that sets up the routes for the application
configureRouters(app);

// 404 handler
app.use((_req, res) => {
    res.status(404).json({ error: "Not Found" });
});


// Error handler
app.use((err: any, _req: any, res: any, _next: any) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});




export default app;


