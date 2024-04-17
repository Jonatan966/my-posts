import { Router } from "express";

import { createUserController } from "./controllers/create-user/create-user.controller";
import { getUserByUsernameController } from "./controllers/get-user-by-username/get-user-by-username.controller";
import { listUserPostsController } from "../post/controllers/list-user-posts/list-user-posts.controller";
import { updateUsernameController } from "./controllers/update-username/update-username.controller";
import { updateUserController } from "./controllers/update-user/update-user.controller";
import { authenticateUserController } from "./controllers/authenticate-user/authenticate-user.controller";
import { protectedRouteMiddleware } from "../../middlewares/protected-route-middleware";
import { getAuthenticatedUser } from "./controllers/get-authenticated-user/get-authenticated-user.controller";
import { followUserController } from "./controllers/follow-user/follow-user.controller";

const userRouter = Router();

userRouter.post("/", createUserController);

userRouter.post("/auth", authenticateUserController);

userRouter.use(protectedRouteMiddleware);

userRouter.get("/me", getAuthenticatedUser);
userRouter.patch("/me/username", updateUsernameController);
userRouter.put("/me", updateUserController);

userRouter.get("/:username/posts", listUserPostsController);
userRouter.get("/:username", getUserByUsernameController);

userRouter.post("/:username/followers", followUserController);

export { userRouter };
