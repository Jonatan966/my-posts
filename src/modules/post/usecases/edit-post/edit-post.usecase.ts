import { AppError } from "../../../../utils/error";
import { PostModuleErrors } from "../../errors";
import { postRepository } from "../../repositories/post/repository";
import { PostRepository } from "../../repositories/post/types";

interface EditPostDTO {
  id: string;
  content: string;
  author_id: string;
}

export const makeEditPost = (
  findOnePostById: PostRepository["findOneById"],
  updatePost: PostRepository["update"],
  createPost: PostRepository["create"]
) => {
  return async (editPayload: EditPostDTO) => {
    const foundPost = await findOnePostById(editPayload.id);

    if (!foundPost) {
      throw new AppError(PostModuleErrors.post_not_found);
    }

    if (foundPost.author_id !== editPayload.author_id) {
      throw new AppError(PostModuleErrors.post_not_able_to_edit);
    }

    if (foundPost.is_edited) {
      throw new AppError(PostModuleErrors.post_already_edited);
    }

    const [newPostVersion] = await Promise.all([
      createPost({
        author_id: foundPost.author_id,
        content: editPayload.content,
        original_version_id: foundPost.id,
      }),
      updatePost({
        id: foundPost.id,
        is_edited: true,
      }),
    ]);

    return newPostVersion;
  };
};

export const editPost = makeEditPost(
  postRepository.findOneById,
  postRepository.update,
  postRepository.create
);
