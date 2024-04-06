import { Request, Response } from "express";
import { listPosts } from "../../usecases/list-posts/list-posts.usecase";

export const listPostsController = async (_: Request, response: Response) => {
  const posts = await listPosts();

  return response.json({ posts });
};
