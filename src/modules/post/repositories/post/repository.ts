import cuid2 from "@paralleldrive/cuid2";
import { prisma } from "../../../../services/prisma";
import { PostRepository } from "./types";

export const postRepository: PostRepository = {
  async create(postData) {
    const createdPost = await prisma.post.create({
      data: {
        id: cuid2.createId(),
        content: postData.content,
        author_id: postData.author_id,
      },
    });

    return createdPost;
  },
  async delete(post_id) {
    await prisma.post.update({
      where: {
        id: post_id,
        deleted_at: null,
      },
      data: {
        deleted_at: new Date(),
      },
    });
  },
  async findOneById(post_id) {
    const foundPost = await prisma.post.findUnique({
      where: {
        id: post_id,
        deleted_at: null,
      },
    });

    return foundPost;
  },
};
