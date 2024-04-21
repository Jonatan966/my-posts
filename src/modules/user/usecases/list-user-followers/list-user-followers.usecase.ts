import { relationshipRepository } from "../../repositories/relationship/repository";
import { RelationshipRepository } from "../../repositories/relationship/types";
import { userRepository } from "../../repositories/user/repository";
import { UserRepository } from "../../repositories/user/types";

export const makeListUserFollowers = (
  findManyRelationshipsByFollowing: RelationshipRepository["findManyByFollowing"],
  findManyUsersByIds: UserRepository["findManyByIds"]
) => {
  return async (user_id: string) => {
    const relationships = await findManyRelationshipsByFollowing(user_id);

    const users = await findManyUsersByIds(
      relationships.map((relationship) => relationship.follower_id)
    );

    return users.map((user) => ({ ...user, password: null }));
  };
};

export const listUserFollowers = makeListUserFollowers(
  relationshipRepository.findManyByFollowing,
  userRepository.findManyByIds
);
