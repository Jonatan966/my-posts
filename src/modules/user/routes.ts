import { FastifyInstance } from "fastify";

import { verifyJwt } from "../../middlewares/verify-jwt";

import { createUserController } from "./controllers/create-user/create-user.controller";
import { getUserByUsernameController } from "./controllers/get-user-by-username/get-user-by-username.controller";
import { listUserPostsController } from "../post/controllers/list-user-posts/list-user-posts.controller";
import { updateUsernameController } from "./controllers/update-username/update-username.controller";
import { updateUserController } from "./controllers/update-user/update-user.controller";
import { authenticateUserController } from "./controllers/authenticate-user/authenticate-user.controller";
import { getAuthenticatedUser } from "./controllers/get-authenticated-user/get-authenticated-user.controller";
import { followUserController } from "./controllers/follow-user/follow-user.controller";
import { listUsersController } from "./controllers/list-users/list-users.controller";

export async function userRoutes(app: FastifyInstance) {
  app.register(createUserController);

  app.register(authenticateUserController);

  app.addHook("onRequest", verifyJwt);

  app.register(listUsersController);

  app.register(getAuthenticatedUser);
  app.register(updateUsernameController);
  app.register(updateUserController);

  app.register(listUserPostsController);
  app.register(getUserByUsernameController);

  app.register(followUserController);
}
