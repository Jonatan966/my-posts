import { AppError } from "../../../../utils/error";
import { PostModuleErrors } from "../../errors";
import { postRepository } from "../../repositories/post/repository";
import { PostRepository } from "../../repositories/post/types";

export const makeGetPost = (findOnePostById: PostRepository["findOneById"]) => {
  return async (post_id: string) => {
    const post = await findOnePostById(post_id);

    if (!post) {
      throw new AppError(PostModuleErrors.post_not_found);
    }

    return post;
  };
};

export const getPost = makeGetPost(postRepository.findOneById);
