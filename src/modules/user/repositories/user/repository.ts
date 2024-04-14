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
        bio: user.bio,
        username_updated_at: user.username_updated_at,
      },
    });

    return updatedUser;
  },
};
