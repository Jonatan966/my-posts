import { AppError } from "../../../../utils/error";
import { UserModuleErrorType, UserModuleErrors } from "../../errors";
import { userRepository } from "../../repositories/user/repository";
import { UserRepository } from "../../repositories/user/types";

interface UpdateUserDTO {
  id: string;
  display_name?: string;
  bio?: string;
}

export const makeUpdateUser = (
  findOneUserById: UserRepository["findOneById"],
  updateUser: UserRepository["update"]
) => {
  return async (user: UpdateUserDTO) => {
    const foundUser = await findOneUserById(user.id);

    if (!foundUser) {
      throw new AppError(UserModuleErrors[UserModuleErrorType.UserNotFound]);
    }

    const updatedUser = await updateUser({
      id: user.id,
      bio: user.bio,
      display_name: user.display_name,
    });

    return updatedUser;
  };
};

export const updateUser = makeUpdateUser(
  userRepository.findOneById,
  userRepository.update
);
