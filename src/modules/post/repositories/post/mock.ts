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
        is_edited: false,
        original_version_id: postData.original_version_id || null,
        reposted_post_id: postData.reposted_post_id || null,
        parent_post_id: postData.parent_post_id || null,
        root_post_id: postData.root_post_id || null,
      };

      posts.push(newPost);

      return newPost;
    },
    async delete(post_id) {
      for (let postIndex = posts.length - 1; postIndex >= 0; postIndex--) {
        const currentPost = posts[postIndex];

        if (
          currentPost.id !== post_id &&
          currentPost.original_version_id !== post_id
        ) {
          continue;
        }

        posts.splice(postIndex, 1);
      }
    },
    async findOneById(post_id) {
      const foundPost = posts.find(
        (post) => post.deleted_at === null && post.id === post_id
      );

      return foundPost || null;
    },
    async update(post) {
      const foundPost = posts.find((p) => p.id === post.id)!;

      foundPost.is_edited = post.is_edited || false;
      foundPost.content = post.content || foundPost.content;

      return foundPost;
    },
    async list({
      author_id,
      parent_post_id = null,
      page_token,
      posts_per_page,
    }) {
      const filteredPosts = posts.filter(
        (post) =>
          !post.deleted_at &&
          !post.is_edited &&
          (!author_id || post.author_id === author_id) &&
          post.parent_post_id === parent_post_id
      );

      const targetTokenPost = filteredPosts.findIndex(
        (post) => post.id === page_token
      );

      return filteredPosts.splice(targetTokenPost + 1, posts_per_page);
    },
  };
}
