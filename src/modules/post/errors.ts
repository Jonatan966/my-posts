import { ErrorProps } from "../../utils/error";

export enum PostModuleErrorType {
  PostNotFound = "post_not_found",
  PostNotAbleToDelete = "post_not_able_to_delete",
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
};
