import { AppError } from "../../../../utils/error";
import { UserModuleErrors } from "../../errors";
import { userRepository } from "../../repositories/user/repository";
import { UserRepository } from "../../repositories/user/types";

export const makeGetUserByUsername = (
  findOneUserByUsername: UserRepository["findOneByUsername"]
) => {
  return async (username: string) => {
    const user = await findOneUserByUsername(username);

    if (!user || !!user.deleted_at) {
      throw new AppError(UserModuleErrors.user_not_found);
    }

    return user;
  };
};

export const getUserByUsername = makeGetUserByUsername(
  userRepository.findOneByUsername
);
