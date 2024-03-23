import { AppError } from "../../../../utils/error";
import { UserModuleErrorType, UserModuleErrors } from "../../errors";
import { userRepository } from "../../repositories/user/repository";
import { UserRepository } from "../../repositories/user/types";

interface CreateUserDTO {
  display_name: string;
  username: string;
  bio?: string;
}

export const makeCreateUser = (
  findOneUserByUsername: UserRepository["findOneByUsername"],
  createUser: UserRepository["create"]
) => {
  return async (userData: CreateUserDTO) => {
    const userAlreadyExists = await findOneUserByUsername(userData.username);

    if (userAlreadyExists) {
      throw new AppError(
        UserModuleErrors[UserModuleErrorType.UserAlreadyExists]
      );
    }

    const createdUser = await createUser({
      display_name: userData.display_name,
      username: userData.username,
      bio: userData.bio,
    });

    return createdUser;
  };
};

export const createUser = makeCreateUser(
  userRepository.findOneByUsername,
  userRepository.create
);
