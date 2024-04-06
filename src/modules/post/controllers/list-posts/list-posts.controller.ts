import { listPosts } from "../../usecases/list-posts/list-posts.usecase";
import { safeController } from "../../../../middlewares/safe-controller";

export const listPostsController = safeController(async (_, response) => {
  const posts = await listPosts();

  return response.json({ posts });
});
