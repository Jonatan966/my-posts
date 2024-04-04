import { ErrorProps } from "../../utils/error";

export enum PostModuleErrorType {
  PostNotFound = "post_not_found",
  RepostedPostNotFound = "reposted_post_not_found",
  ParentPostNotFound = "parent_post_not_found",
  ParentPostNotAbleToComment = "parent_post_not_able_to_comment",
  RepostWithoutContent = "repost_without_content",
  PostNotAbleToRepost = "post_not_able_to_repost",
  PostNotAbleToDelete = "post_not_able_to_delete",
  PostNotAbleToEdit = "post_not_able_to_edit",
  PostAlreadyEdited = "post_already_edited",
  ParentRepostWithoutContent = "parent_repost_without_content",
}

export const PostModuleErrors: Record<PostModuleErrorType, ErrorProps> = {
  [PostModuleErrorType.PostNotFound]: {
    name: PostModuleErrorType.PostNotFound,
    message: "Post not found",
    statusCode: 400,
  },
  [PostModuleErrorType.RepostedPostNotFound]: {
    name: PostModuleErrorType.RepostedPostNotFound,
    message: "Reposted post not found",
    statusCode: 400,
  },
  [PostModuleErrorType.ParentPostNotFound]: {
    name: PostModuleErrorType.ParentPostNotFound,
    message: "Parent post not found",
    statusCode: 400,
  },
  [PostModuleErrorType.ParentPostNotAbleToComment]: {
    name: PostModuleErrorType.ParentPostNotAbleToComment,
    message: "You not have permission to comment this post",
    statusCode: 401,
  },
  [PostModuleErrorType.PostNotAbleToRepost]: {
    name: PostModuleErrorType.PostNotAbleToRepost,
    message: "You not have permission to repost this post",
    statusCode: 401,
  },
  [PostModuleErrorType.RepostWithoutContent]: {
    name: PostModuleErrorType.RepostWithoutContent,
    message: "This target repost not have content",
    statusCode: 400,
  },
  [PostModuleErrorType.ParentRepostWithoutContent]: {
    name: PostModuleErrorType.ParentRepostWithoutContent,
    message: "This target parent repost not have content",
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
