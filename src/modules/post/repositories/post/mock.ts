import { post } from "@prisma/client";
import { PostRepository } from "./types";
import cuid2 from "@paralleldrive/cuid2";

export function makePostRepositoryMock(): PostRepository {
  let posts: post[] = [];

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
    async delete(post_id) {
      const targetPostIndex = posts.findIndex((post) => post.id === post_id);

      posts.splice(targetPostIndex, 1);
    },
    async findOneById(post_id) {
      const foundPost = posts.find(
        (post) => post.deleted_at === null && post.id === post_id
      );

      return foundPost || null;
    },
  };
}
