import { z } from "zod";
import { editPost } from "../../usecases/edit-post/edit-post.usecase";
import { appErrorHandler } from "../../../../middlewares/app-error-handler";

export const editPostController = appErrorHandler(async (request, response) => {
  const paramsSchema = z.object({
    post_id: z.string().cuid2(),
  });

  const bodySchema = z.object({
    content: z.string(),
    author_id: z.string(),
  });

  const params = await paramsSchema.parseAsync(request.params);
  const body = await bodySchema.parseAsync(request.body);

  const updatedPost = await editPost({
    id: params.post_id,
    author_id: body.author_id,
    content: body.content,
  });

  return response.json(updatedPost);
});
