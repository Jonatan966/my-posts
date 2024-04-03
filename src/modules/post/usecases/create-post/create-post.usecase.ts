import { AppError } from "../../../../utils/error";
import { UserModuleErrors } from "../../../user/errors";
import { PostRepository } from "../../repositories/post/types";
import { postRepository } from "../../repositories/post/repository";
import { UserRepository } from "../../../user/repositories/user/types";
import { userRepository } from "../../../user/repositories/user/repository";
import { PostModuleErrors } from "../../errors";

interface CreatePostDTO {
  content: string;
  author_id: string;
  reposted_post_id?: string;
}

export const makeCreatePost = (
  createPost: PostRepository["create"],
  findOnePostById: PostRepository["findOneById"],
  findOneUserById: UserRepository["findOneById"]
) => {
  return async (postData: CreatePostDTO) => {
    const foundUser = await findOneUserById(postData.author_id);

    if (!foundUser) {
      throw new AppError(UserModuleErrors.user_not_found);
    }

    if (postData.reposted_post_id) {
      const repostedPost = await findOnePostById(postData.reposted_post_id);

      if (!repostedPost) {
        throw new AppError(PostModuleErrors.reposted_post_not_found);
      }

      if (repostedPost.is_edited) {
        throw new AppError(PostModuleErrors.post_not_able_to_repost);
      }
    }

    const createdPost = await createPost({
      content: postData.content,
      author_id: foundUser.id,
      reposted_post_id: postData.reposted_post_id,
    });

    return createdPost;
  };
};

export const createPost = makeCreatePost(
  postRepository.create,
  postRepository.findOneById,
  userRepository.findOneById
);
