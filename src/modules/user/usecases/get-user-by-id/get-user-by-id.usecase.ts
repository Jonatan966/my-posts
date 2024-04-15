import { AppError } from "../../../../utils/error";
import { UserModuleErrors } from "../../errors";
import { userRepository } from "../../repositories/user/repository";
import { UserRepository } from "../../repositories/user/types";

export const makeGetUserById = (
  findOneUserById: UserRepository["findOneById"]
) => {
  return async (user_id: string) => {
    const user = await findOneUserById(user_id);

    if (!user) {
      throw new AppError(UserModuleErrors.user_not_found);
    }

    return user;
  };
};

export const getUserById = makeGetUserById(userRepository.findOneById);
