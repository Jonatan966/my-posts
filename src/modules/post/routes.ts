import { Router } from "express";
import { appErrorHandler } from "../../middlewares/app-error-handler";
import { createPostController } from "./controllers/create-post/create-post.controller";
import { getPostController } from "./controllers/get-post/get-post.controller";

const postRouter = Router();

postRouter.post("/", appErrorHandler(createPostController));
postRouter.get("/:post_id", appErrorHandler(getPostController));

export { postRouter };
