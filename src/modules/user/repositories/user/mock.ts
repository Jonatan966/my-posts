import { user } from "@prisma/client";
import cuid2 from "@paralleldrive/cuid2";
import { UserRepository } from "./types";

export function makeUserRepositoryMock(): UserRepository {
  const users: user[] = [];

  return {
    users,
    async findOneByUsername(username) {
      const user = users.find((user) => user.username === username);

      return user || null;
    },
    async findOneById(userId) {
      const user = users.find((user) => user.id === userId);

      return user || null;
    },
    async create(newUserData) {
      const now = new Date();

      const newUser: user = {
        id: cuid2.createId(),
        display_name: newUserData.display_name,
        username: newUserData.username,
        bio: newUserData.bio || null,
        created_at: now,
        updated_at: now,
        deleted_at: null,
        username_updated_at: null,
      };

      users.push(newUser);

      return newUser;
    },
    async update(updateUserData) {
      const targetUser = users.findIndex(
        (user) => user.id === updateUserData.id
      );

      users[targetUser] = {
        ...users[targetUser],
        ...updateUserData,
      };

      return users[targetUser];
    },
  };
}
