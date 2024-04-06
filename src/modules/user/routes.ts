import { Router } from "express";

import { createUserController } from "./controllers/create-user/create-user.controller";
import { getUserByUsernameController } from "./controllers/get-user-by-username/get-user-by-username.controller";
import { listUserPostsController } from "../post/controllers/list-user-posts/list-user-posts.controller";

import { appErrorHandler } from "../../middlewares/app-error-handler";

const userRouter = Router();

userRouter.post("/", appErrorHandler(createUserController));
userRouter.get("/:username", appErrorHandler(getUserByUsernameController));
userRouter.get("/:username/posts", appErrorHandler(listUserPostsController));

export { userRouter };
