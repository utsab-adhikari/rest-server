import {Router} from "express";
import systemRouter from "./systemRoutes.js";
import userRouter from "./usersRoute.js";

const router = Router();

router.use("/system", systemRouter);
router.use("/users", userRouter);

export default router;