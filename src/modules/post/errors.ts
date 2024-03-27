import { ErrorProps } from "../../utils/error";

export enum PostModuleErrorType {
  PostNotFound = "post_not_found",
  PostNotAbleToDelete = "post_not_able_to_delete",
  PostNotAbleToEdit = "post_not_able_to_edit",
  PostAlreadyEdited = "post_already_edited",
}

export const PostModuleErrors: Record<PostModuleErrorType, ErrorProps> = {
  [PostModuleErrorType.PostNotFound]: {
    name: PostModuleErrorType.PostNotFound,
    message: "Post not found",
    statusCode: 400,
  },
  [PostModuleErrorType.PostNotAbleToDelete]: {
    name: PostModuleErrorType.PostNotAbleToDelete,
    message: "You not have permission to delete this post",
    statusCode: 401,
  },
  [PostModuleErrorType.PostNotAbleToEdit]: {
    name: PostModuleErrorType.PostNotAbleToEdit,
    message: "You not have permission to edit this post",
    statusCode: 401,
  },
  [PostModuleErrorType.PostAlreadyEdited]: {
    name: PostModuleErrorType.PostAlreadyEdited,
    message: "This post has already been edited",
    statusCode: 400,
  },
};
