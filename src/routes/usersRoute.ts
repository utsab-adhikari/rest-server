import {Router} from "express"
import { createUser, deleteUser, getUsers, patchUser, updateUser } from "../controllers/usersController.js";


const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.post("/", createUser);
userRouter.put("/:id", updateUser);
userRouter.patch("/:id", patchUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;