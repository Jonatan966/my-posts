import { z } from "zod";
import { getPost } from "../../usecases/get-post/get-post.usecase";
import { safeController } from "../../../../middlewares/safe-controller";

export const getPostController = safeController(async (request, response) => {
  const paramsSchema = z.object({
    post_id: z.string().cuid2(),
  });

  const params = await paramsSchema.parseAsync(request.params);

  const post = await getPost(params.post_id);

  return response.json(post);
});
