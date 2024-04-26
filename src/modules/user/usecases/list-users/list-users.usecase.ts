import { userRepository } from "../../repositories/user/repository";
import { UserRepository } from "../../repositories/user/types";

interface ListUsersProps {
  querySearch?: string;
  page_token?: string;
  page_size?: number;
}

const USERS_PER_PAGE = 20;

export const makeListUsers = (findManyUsers: UserRepository["findMany"]) => {
  return async ({ querySearch, page_token, page_size }: ListUsersProps) => {
    const pageSize = page_size || USERS_PER_PAGE;

    const foundUsers = await findManyUsers({
      querySearch,
      page_token,
      users_per_page: pageSize,
    });

    const parsedUsers = foundUsers.map((user) => ({
      ...user,
      password: null,
    }));

    const lastPageUser = parsedUsers.at(-1);

    return {
      users: parsedUsers,
      next_page_token:
        parsedUsers.length === pageSize ? lastPageUser?.id : undefined,
    };
  };
};

export const listUsers = makeListUsers(userRepository.findMany);
