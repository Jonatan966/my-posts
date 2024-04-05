import { Router } from "express";
import { createUserController } from "./controllers/create-user/create-user.controller";

import { appErrorHandler } from "../../middlewares/app-error-handler";

const userRouter = Router();

userRouter.post("/", appErrorHandler(createUserController));

export { userRouter };
