import { AppError } from "../../../../utils/error";
import { UserModuleErrors } from "../../errors";
import { userRepository } from "../../repositories/user/repository";
import { UserRepository } from "../../repositories/user/types";

interface UpdateUsernameDTO {
  id: string;
  username: string;
}

export const makeUpdateUsername = (
  updateUser: UserRepository["update"],
  findUserByUsername: UserRepository["findOneByUsername"],
  findUserById: UserRepository["findOneById"]
) => {
  return async (updateUserData: UpdateUsernameDTO) => {
    const foundUser = await findUserById(updateUserData.id);

    if (!foundUser) {
      throw new AppError(UserModuleErrors.user_not_found);
    }

    if (foundUser.username === updateUserData.username) {
      return foundUser;
    }

    const hasUserWithSameUsername = await findUserByUsername(
      updateUserData.username
    );

    if (
      !!hasUserWithSameUsername &&
      hasUserWithSameUsername.id !== foundUser.id
    ) {
      throw new AppError(UserModuleErrors.user_already_exists);
    }

    const updatedUser = await updateUser({
      id: foundUser.id,
      username: updateUserData.username,
    });

    return updatedUser;
  };
};

export const updateUsername = makeUpdateUsername(
  userRepository.update,
  userRepository.findOneByUsername,
  userRepository.findOneById
);
