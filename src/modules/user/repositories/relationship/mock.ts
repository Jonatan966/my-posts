import { relationship } from "@prisma/client";
import { RelationshipRepository } from "./types";

export function makeRelationshipRepositoryMock(): RelationshipRepository {
  const relationships: relationship[] = [];

  return {
    async create(data) {
      const newRelationship = {
        follower_id: data.follower_id,
        following_id: data.following_id,
        created_at: new Date(),
      };

      relationships.push(newRelationship);

      return newRelationship;
    },
    async findManyByFollower(follower_id) {
      return relationships.filter(
        (relationship) => relationship.follower_id === follower_id
      );
    },
    async findManyByFollowing(following_id) {
      return relationships.filter(
        (relationship) => relationship.following_id === following_id
      );
    },
    async findOne(follower_id, following_id) {
      const relationship = relationships.find(
        (relationship) =>
          relationship.follower_id === follower_id &&
          relationship.following_id === following_id
      );

      return relationship || null;
    },
  };
}
