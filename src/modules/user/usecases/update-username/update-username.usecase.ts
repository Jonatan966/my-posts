import dayjs from "dayjs";
import { AppError } from "../../../../utils/error";
import { UserModuleErrors } from "../../errors";
import { userRepository } from "../../repositories/user/repository";
import { UserRepository } from "../../repositories/user/types";

interface UpdateUsernameDTO {
  id: string;
  username: string;
}

const MINIMAL_COOLDOWN_TO_UPDATE_IN_DAYS = 7;

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

    if (
      foundUser.username_updated_at &&
      dayjs().diff(foundUser.username_updated_at, "days") <
        MINIMAL_COOLDOWN_TO_UPDATE_IN_DAYS
    ) {
      throw new AppError(UserModuleErrors.username_not_able_to_update);
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
      username_updated_at: new Date(),
    });

    return updatedUser;
  };
};

export const updateUsername = makeUpdateUsername(
  userRepository.update,
  userRepository.findOneByUsername,
  userRepository.findOneById
);
