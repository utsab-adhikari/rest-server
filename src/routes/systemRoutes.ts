import { Router } from "express";
import { getSystemMetrics } from "../controllers/systemController.js";

const systemRouter = Router();

systemRouter.get("/metrics", getSystemMetrics);

export default systemRouter;