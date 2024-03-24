import { AppError } from "../../../../utils/error";
import { PostModuleErrors } from "../../errors";
import { postRepository } from "../../repositories/post/repository";
import { PostRepository } from "../../repositories/post/types";

interface DeletePostDTO {
  post_id: string;
  author_id: string;
}

export const makeDeletePost = (
  deletePost: PostRepository["delete"],
  findOnePostById: PostRepository["findOneById"]
) => {
  return async (deletePostData: DeletePostDTO) => {
    const foundPost = await findOnePostById(deletePostData.post_id);

    if (!foundPost) {
      throw new AppError(PostModuleErrors.post_not_found);
    }

    if (foundPost?.author_id !== deletePostData.author_id) {
      throw new AppError(PostModuleErrors.post_not_able_to_delete);
    }

    await deletePost(deletePostData.post_id);
  };
};

export const deletePost = makeDeletePost(
  postRepository.delete,
  postRepository.findOneById
);
