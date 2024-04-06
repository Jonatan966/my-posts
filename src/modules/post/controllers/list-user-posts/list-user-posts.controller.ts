import { z } from "zod";
import { getUserByUsername } from "../../../user/usecases/get-user-by-username/get-user-by-username.usecase";
import { listPosts } from "../../usecases/list-posts/list-posts.usecase";
import { appErrorHandler } from "../../../../middlewares/app-error-handler";

export const listUserPostsController = appErrorHandler(
  async (request, response) => {
    const paramsSchema = z.object({
      username: z.string(),
    });

    const params = await paramsSchema.parseAsync(request.params);

    const user = await getUserByUsername(params.username);

    const posts = await listPosts({
      author_id: user.id,
    });

    return response.json({ posts });
  }
);
