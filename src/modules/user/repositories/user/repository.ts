import cuid2 from "@paralleldrive/cuid2";
import { prisma } from "../../../../services/prisma";
import { UserRepository } from "./types";

export const userRepository: UserRepository = {
  async findOneByUsername(username) {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    return user;
  },
  async findOneById(userId) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  },
  async create(user) {
    const newUser = await prisma.user.create({
      data: {
        id: cuid2.createId(),
        display_name: user.display_name,
        username: user.username,
        password: user.password,
        bio: user.bio,
      },
    });

    return newUser;
  },
  async update(user) {
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        display_name: user.display_name,
        username: user.username,
        password: user.password,
        bio: user.bio,
        username_updated_at: user.username_updated_at,
      },
    });

    return updatedUser;
  },
  async findMany(filters) {
    return await prisma.user.findMany({
      where: {
        deleted_at: null,
        OR: filters?.querySearch
          ? [
              {
                username: {
                  contains: filters.querySearch,
                },
              },
              {
                display_name: {
                  contains: filters.querySearch,
                },
              },
            ]
          : undefined,
      },
      skip: !!filters?.page_token ? 1 : 0,
      take: filters?.users_per_page,
      cursor: filters?.page_token
        ? {
            id: filters.page_token,
          }
        : undefined,
    });
  },
  async findManyByIds(ids) {
    return await prisma.user.findMany({
      where: {
        id: { in: ids },
      },
    });
  },
};
