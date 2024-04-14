import { compare, hash } from "bcrypt";
import { AppError } from "../../../../utils/error";
import { UserModuleErrors } from "../../errors";
import { UserRepository } from "../../repositories/user/types";
import { userRepository } from "../../repositories/user/repository";

interface UpdatePasswordDTO {
  user_id: string;
  new_password: string;
}

export const makeUpdatePassword = (
  findOneUserById: UserRepository["findOneById"],
  updateUser: UserRepository["update"]
) => {
  return async ({ user_id, new_password }: UpdatePasswordDTO) => {
    const user = await findOneUserById(user_id);

    if (!user) {
      throw new AppError(UserModuleErrors.user_not_found);
    }

    const newPasswordHash = await hash(new_password, 12);
    const isSamePassword = await compare(new_password, user.password);

    if (isSamePassword) {
      throw new AppError(UserModuleErrors.same_password);
    }

    const updatedUser = await updateUser({
      id: user_id,
      password: newPasswordHash,
    });

    return updatedUser;
  };
};

export const updatePassword = makeUpdatePassword(
  userRepository.findOneById,
  userRepository.update
);
