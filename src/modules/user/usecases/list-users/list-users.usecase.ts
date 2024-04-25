import { userRepository } from "../../repositories/user/repository";
import { UserRepository } from "../../repositories/user/types";

interface ListUsersProps {
  querySearch?: string;
}

export const makeListUsers = (findManyUsers: UserRepository["findMany"]) => {
  return async ({ querySearch }: ListUsersProps) => {
    const foundUsers = await findManyUsers({
      querySearch,
    });

    const parsedUsers = foundUsers.map((user) => ({
      ...user,
      password: null,
    }));

    return { users: parsedUsers };
  };
};

export const listUsers = makeListUsers(userRepository.findMany);
