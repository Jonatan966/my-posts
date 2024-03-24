import { AppError } from "../../../../utils/error";
import { UserModuleErrors } from "../../../user/errors";
import { PostRepository } from "../../repositories/post/types";
import { postRepository } from "../../repositories/post/repository";
import { UserRepository } from "../../../user/repositories/user/types";
import { userRepository } from "../../../user/repositories/user/repository";

interface CreatePostDTO {
  content: string;
  author_id: string;
}

export const makeCreatePost = (
  createPost: PostRepository["create"],
  findOneUserById: UserRepository["findOneById"]
) => {
  return async (postData: CreatePostDTO) => {
    const foundUser = await findOneUserById(postData.author_id);

    if (!foundUser) {
      throw new AppError(UserModuleErrors.user_not_found);
    }

    const createdPost = await createPost({
      content: postData.content,
      author_id: foundUser.id,
    });

    return createdPost;
  };
};

export const createPost = makeCreatePost(
  postRepository.create,
  userRepository.findOneById
);
