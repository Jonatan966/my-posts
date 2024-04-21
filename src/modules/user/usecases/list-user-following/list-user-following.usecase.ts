import { relationshipRepository } from "../../repositories/relationship/repository";
import { RelationshipRepository } from "../../repositories/relationship/types";
import { userRepository } from "../../repositories/user/repository";
import { UserRepository } from "../../repositories/user/types";

export const makeListUserFollowing = (
  findManyRelationshipsByFollower: RelationshipRepository["findManyByFollower"],
  findManyUsersByIds: UserRepository["findManyByIds"]
) => {
  return async (user_id: string) => {
    const relationships = await findManyRelationshipsByFollower(user_id);

    const users = await findManyUsersByIds(
      relationships.map((relationship) => relationship.following_id)
    );

    return users.map((user) => ({ ...user, password: null }));
  };
};

export const listUserFollowing = makeListUserFollowing(
  relationshipRepository.findManyByFollower,
  userRepository.findManyByIds
);
