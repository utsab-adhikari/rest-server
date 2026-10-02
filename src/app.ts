import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import { apiLimiter } from "./middlewares/rateLimiter.js";
import router from "./routes/index.js";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Application = express();

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"], 
            styleSrc: ["'self'", "'unsafe-inline'"],  
        },
    },
}));
app.use(cors());
app.use(express.json({ limit: '10kb' }));

app.use(express.static(path.join(__dirname, '../public')));
app.get('/ui', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public/ui/index.html'));
});

app.use("/api", apiLimiter);

app.use("/api", router);
export default app;