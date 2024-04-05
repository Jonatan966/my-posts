import { Router } from "express";
import { appErrorHandler } from "../../middlewares/app-error-handler";
import { createPostController } from "./controllers/create-post/create-post.controller";

const postRouter = Router();

postRouter.post("/", appErrorHandler(createPostController));

export { postRouter };
