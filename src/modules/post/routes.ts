import { FastifyInstance } from "fastify";

import { createPostController } from "./controllers/create-post/create-post.controller";
import { getPostController } from "./controllers/get-post/get-post.controller";
import { listPostsController } from "./controllers/list-posts/list-posts.controller";
import { editPostController } from "./controllers/edit-post/edit-post.controller";
import { listPostCommentsController } from "./controllers/list-post-comments/list-post-comments.controller";
import { deletePostController } from "./controllers/delete-post/delete-post.controller";
import { verifyJwt } from "../../middlewares/verify-jwt";

export async function postRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  app.register(createPostController);
  app.register(deletePostController);
  app.register(editPostController);
  app.register(getPostController);
  app.register(listPostCommentsController);
  app.register(listPostsController);
}
