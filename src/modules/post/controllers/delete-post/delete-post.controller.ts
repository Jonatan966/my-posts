import { z } from "zod";
import { deletePost } from "../../usecases/delete-post/delete-post.usecase";
import { safeController } from "../../../../middlewares/safe-controller";

export const deletePostController = safeController(
  async (request, response) => {
    const paramsSchema = z.object({
      post_id: z.string().cuid2(),
    });

    const params = await paramsSchema.parseAsync(request.params);

    await deletePost({
      author_id: request.userId,
      post_id: params.post_id,
    });

    return response.sendStatus(204);
  }
);
