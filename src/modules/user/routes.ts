import { Router } from "express";
import { createUserController } from "./controllers/create-user/create-user.controller";

import { appErrorHandler } from "../../middlewares/app-error-handler";
import { getUserByUsernameController } from "./controllers/get-user-by-username/get-user-by-username.controller";

const userRouter = Router();

userRouter.post("/", appErrorHandler(createUserController));
userRouter.get("/:username", appErrorHandler(getUserByUsernameController));

export { userRouter };
