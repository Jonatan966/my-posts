import { Request, Response } from "express";
import { z } from "zod";
import { getPost } from "../../usecases/get-post/get-post.usecase";
import { listPosts } from "../../usecases/list-posts/list-posts.usecase";

export const listPostCommentsController = async (
  request: Request,
  response: Response
) => {
  const paramsSchema = z.object({
    post_id: z.string().cuid2(),
  });

  const params = await paramsSchema.parseAsync(request.params);

  const foundPost = await getPost(params.post_id);

  const comments = await listPosts({
    parent_post_id: foundPost.id,
  });

  return response.json({ comments });
};
