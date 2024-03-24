import { post } from "@prisma/client";
import { PostRepository } from "./types";
import cuid2 from "@paralleldrive/cuid2";

export function makePostRepositoryMock(): PostRepository {
  const posts: post[] = [];

  return {
    posts,
    async create(postData) {
      const newPost: post = {
        id: cuid2.createId(),
        content: postData.content,
        author_id: postData.author_id,
        created_at: new Date(),
        deleted_at: null,
      };

      posts.push(newPost);

      return newPost;
    },
  };
}
