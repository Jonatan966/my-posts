import { compare } from "bcrypt";
import { AppError } from "../../../../utils/error";
import { UserModuleErrors } from "../../errors";
import { userRepository } from "../../repositories/user/repository";
import { UserRepository } from "../../repositories/user/types";

interface AuthenticateUserDTO {
  username: string;
  password: string;
}

export const makeAuthenticateUser = (
  findOneUserByUsername: UserRepository["findOneByUsername"]
) => {
  return async ({ password, username }: AuthenticateUserDTO) => {
    const user = await findOneUserByUsername(username);

    if (!user) {
      throw new AppError(UserModuleErrors.user_not_found);
    }

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      throw new AppError(UserModuleErrors.invalid_password);
    }

    return user;
  };
};

export const authenticateUser = makeAuthenticateUser(
  userRepository.findOneByUsername
);
