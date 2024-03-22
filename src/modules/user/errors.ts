import { ErrorProps } from "../../utils/error";

export enum UserModuleErrorType {
  UserAlreadyExists = "user_already_exists",
}

export const UserModuleErrors: Record<UserModuleErrorType, ErrorProps> = {
  [UserModuleErrorType.UserAlreadyExists]: {
    name: UserModuleErrorType.UserAlreadyExists,
    message: "This username is already exists",
    statusCode: 400,
  },
};
