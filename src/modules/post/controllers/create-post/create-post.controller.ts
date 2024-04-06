import { z } from "zod";
import { createPost } from "../../usecases/create-post/create-post.usecase";
import { appErrorHandler } from "../../../../middlewares/app-error-handler";

export const createPostController = appErrorHandler(
  async (request, response) => {
    const postSchema = z.object({
      content: z.string(),
      author_id: z.string(),
      reposted_post_id: z.string().optional(),
      parent_post_id: z.string().optional(),
    });

    const postPayload = await postSchema.parseAsync(request.body);

    const post = await createPost(postPayload);

    return response.status(201).json(post);
  }
);
