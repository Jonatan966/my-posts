import { userRepository } from "../../repositories/user/repository";
import { UserRepository } from "../../repositories/user/types";

export const makeListUsers = (findManyUsers: UserRepository["findMany"]) => {
  return async () => {
    const foundUsers = await findManyUsers();

    const parsedUsers = foundUsers.map((user) => ({
      ...user,
      password: null,
    }));

    return { users: parsedUsers };
  };
};

export const listUsers = makeListUsers(userRepository.findMany);
