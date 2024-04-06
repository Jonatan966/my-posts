import { postRepository } from "../../repositories/post/repository";
import { PostRepository } from "../../repositories/post/types";

interface ListPostsDTO {
  author_id?: string;
}

export const makeListPosts = (listPosts: PostRepository["list"]) => {
  return async (params?: ListPostsDTO) => {
    const posts = await listPosts({
      author_id: params?.author_id,
    });

    return posts;
  };
};

export const listPosts = makeListPosts(postRepository.list);