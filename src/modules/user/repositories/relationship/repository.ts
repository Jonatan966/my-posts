import { prisma } from "../../../../services/prisma";
import { RelationshipRepository } from "./types";

export const relationshipRepository: RelationshipRepository = {
  async create({ follower_id, following_id }) {
    return await prisma.relationship.create({
      data: {
        follower_id,
        following_id,
      },
    });
  },
  async findOne(follower_id, following_id) {
    return await prisma.relationship.findUnique({
      where: {
        follower_id_following_id: {
          follower_id,
          following_id,
        },
      },
    });
  },
  async findManyByFollower(follower_id) {
    return await prisma.relationship.findMany({
      where: {
        follower_id,
      },
    });
  },
  async findManyByFollowing(following_id) {
    return await prisma.relationship.findMany({
      where: {
        following_id,
      },
    });
  },
};
