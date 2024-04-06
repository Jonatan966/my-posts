import { z } from "zod";
import { deletePost } from "../../usecases/delete-post/delete-post.usecase";
import { safeController } from "../../../../middlewares/safe-controller";

export const deletePostController = safeController(
  async (request, response) => {
    const paramsSchema = z.object({
      post_id: z.string().cuid2(),
    });

    const bodySchema = z.object({
      author_id: z.string().cuid2(),
    });

    const params = await paramsSchema.parseAsync(request.params);
    const body = await bodySchema.parseAsync(request.body);

    await deletePost({
      author_id: body.author_id,
      post_id: params.post_id,
    });

    return response.sendStatus(204);
  }
);
