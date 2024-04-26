import { postRepository } from "../../repositories/post/repository";
import { PostRepository } from "../../repositories/post/types";

interface ListPostsDTO {
  author_id?: string;
  parent_post_id?: string;
  page_token?: string;
  page_size?: number;
}

const POSTS_PER_PAGE = 20;

export const makeListPosts = (listPosts: PostRepository["list"]) => {
  return async (params?: ListPostsDTO) => {
    const pageSize = params?.page_size || POSTS_PER_PAGE;

    const posts = await listPosts({
      author_id: params?.author_id,
      parent_post_id: params?.parent_post_id || null,
      page_token: params?.page_token,
      posts_per_page: pageSize,
    });

    const lastPagePost = posts.at(-1);

    return {
      posts,
      next_page_token: posts.length === pageSize ? lastPagePost?.id : undefined,
    };
  };
};

export const listPosts = makeListPosts(postRepository.list);
