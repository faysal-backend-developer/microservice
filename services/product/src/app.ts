import express, { Application } from 'express';
import cors from 'cors';
import { appRouter } from './app/modules/router';

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (_req, res) => {
    res.send("Product Service is running on port 4001");
})

app.get("/test", async (_req, res, next) => {
    res.status(200).json({ status: "Test" })
    next();
})

app.get("/health", (_req, res) => {
    res.status(200).json({ status: "UP" });
})

app.use((req, res, next) => {
    const allowedOrigins = ["http://localhost:8080", "http://127.0.0.1:8080"];
    const origin = req.headers.origin || "";

    if(allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        next();
    }else{
        res.status(403).json({ error: "Forbidden" });
    }
})

app.use("/", appRouter);
// 404 handler
app.use((_req, res) => {
    res.status(404).json({ error: "Not Found" });
})


// Error handler
app.use((err: any, _req: any, res: any, _next: any) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

export default app;