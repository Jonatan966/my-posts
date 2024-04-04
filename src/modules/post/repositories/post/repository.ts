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
        original_version_id: postData.original_version_id,
        reposted_post_id: postData.reposted_post_id,
        parent_post_id: postData.parent_post_id,
        root_post_id: postData.root_post_id,
      },
    });

    return createdPost;
  },
  async delete(post_id) {
    await prisma.post.updateMany({
      where: {
        deleted_at: null,
        OR: [
          {
            original_version_id: post_id,
          },
          {
            id: post_id,
          },
        ],
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
  async update(post) {
    const updatedPost = await prisma.post.update({
      where: {
        id: post.id,
      },
      data: {
        is_edited: post.is_edited,
      },
    });

    return updatedPost;
  },
};
