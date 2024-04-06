import { Router } from "express";
import { appErrorHandler } from "../../middlewares/app-error-handler";
import { createPostController } from "./controllers/create-post/create-post.controller";
import { getPostController } from "./controllers/get-post/get-post.controller";
import { listPostsController } from "./controllers/list-posts/list-posts.controller";
import { editPostController } from "./controllers/edit-post/edit-post.controller";

const postRouter = Router();

postRouter.post("/", appErrorHandler(createPostController));
postRouter.get("/", appErrorHandler(listPostsController));
postRouter.get("/:post_id", appErrorHandler(getPostController));
postRouter.put("/:post_id", appErrorHandler(editPostController));

export { postRouter };
