import { Router } from "express";
import { createPostController } from "./controllers/create-post/create-post.controller";
import { getPostController } from "./controllers/get-post/get-post.controller";
import { listPostsController } from "./controllers/list-posts/list-posts.controller";
import { editPostController } from "./controllers/edit-post/edit-post.controller";
import { listPostCommentsController } from "./controllers/list-post-comments/list-post-comments.controller";
import { deletePostController } from "./controllers/delete-post/delete-post.controller";
import { protectedRouteMiddleware } from "../../middlewares/protected-route-middleware";

const postRouter = Router();

postRouter.use(protectedRouteMiddleware);

postRouter.post("/", createPostController);
postRouter.get("/", listPostsController);
postRouter.get("/:post_id", getPostController);
postRouter.put("/:post_id", editPostController);
postRouter.delete("/:post_id", deletePostController);
postRouter.get("/:post_id/comments", listPostCommentsController);

export { postRouter };
