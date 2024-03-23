import { ErrorProps } from "../../utils/error";

export enum UserModuleErrorType {
  UserAlreadyExists = "user_already_exists",
  UserNotFound = "user_not_found",
  UsernameNotAbleToUpdate = "username_not_able_to_update",
}

export const UserModuleErrors: Record<UserModuleErrorType, ErrorProps> = {
  [UserModuleErrorType.UserAlreadyExists]: {
    name: UserModuleErrorType.UserAlreadyExists,
    message: "This username is already exists",
    statusCode: 400,
  },
  [UserModuleErrorType.UserNotFound]: {
    name: UserModuleErrorType.UserNotFound,
    message: "User not found",
    statusCode: 400,
  },
  [UserModuleErrorType.UsernameNotAbleToUpdate]: {
    name: UserModuleErrorType.UsernameNotAbleToUpdate,
    message: "The username is not able to update yet. Wait end of cooldown",
    statusCode: 400,
  },
};
