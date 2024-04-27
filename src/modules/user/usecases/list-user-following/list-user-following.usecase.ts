import { relationshipRepository } from "../../repositories/relationship/repository";
import { RelationshipRepository } from "../../repositories/relationship/types";
import { userRepository } from "../../repositories/user/repository";
import { UserRepository } from "../../repositories/user/types";

interface ListUserFollowingProps {
  page_token?: string;
  page_size?: number;
  user_id: string;
}

const USERS_PER_PAGE = 20;

export const makeListUserFollowing = (
  findManyRelationshipsByFollower: RelationshipRepository["findManyByFollower"],
  findManyUsersByIds: UserRepository["findManyByIds"]
) => {
  return async ({ user_id, page_token, page_size }: ListUserFollowingProps) => {
    const pageSize = page_size || USERS_PER_PAGE;

    const relationships = await findManyRelationshipsByFollower({
      follower_id: user_id,
      page_token,
      page_size: pageSize,
    });

    const users = await findManyUsersByIds(
      relationships.map((relationship) => relationship.following_id)
    );

    const lastPageRelationship = relationships.at(-1);

    return {
      users: users.map((user) => ({ ...user, password: null })),
      next_page_token:
        relationships.length === pageSize
          ? lastPageRelationship?.following_id
          : undefined,
    };
  };
};

export const listUserFollowing = makeListUserFollowing(
  relationshipRepository.findManyByFollower,
  userRepository.findManyByIds
);
