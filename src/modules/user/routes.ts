import { Router } from "express";

import { createUserController } from "./controllers/create-user/create-user.controller";
import { getUserByUsernameController } from "./controllers/get-user-by-username/get-user-by-username.controller";
import { listUserPostsController } from "../post/controllers/list-user-posts/list-user-posts.controller";
import { updateUsernameController } from "./controllers/update-username/update-username.controller";
import { updateUserController } from "./controllers/update-user/update-user.controller";

const userRouter = Router();

userRouter.post("/", createUserController);
userRouter.get("/:username", getUserByUsernameController);
userRouter.put("/:username", updateUserController);

userRouter.patch("/:username/username", updateUsernameController);
userRouter.get("/:username/posts", listUserPostsController);

export { userRouter };
