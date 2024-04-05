import { Request, Response } from "express";
import { z } from "zod";
import { createPost } from "../../usecases/create-post/create-post.usecase";

export const createPostController = async (req: Request, res: Response) => {
  const postSchema = z.object({
    content: z.string(),
    author_id: z.string(),
    reposted_post_id: z.string().optional(),
    parent_post_id: z.string().optional(),
  });

  const postPayload = await postSchema.parseAsync(req.body);

  const post = await createPost(postPayload);

  return res.status(201).json(post);
};
