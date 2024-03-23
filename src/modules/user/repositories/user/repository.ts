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
  async create(user) {
    const newUser = await prisma.user.create({
      data: {
        id: cuid2.createId(),
        display_name: user.display_name,
        username: user.username,
      },
    });

    return newUser;
  },
};
