import { listPosts } from "../../usecases/list-posts/list-posts.usecase";
import { appErrorHandler } from "../../../../middlewares/app-error-handler";

export const listPostsController = appErrorHandler(async (_, response) => {
  const posts = await listPosts();

  return response.json({ posts });
});
