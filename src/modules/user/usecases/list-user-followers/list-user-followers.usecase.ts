import { relationshipRepository } from "../../repositories/relationship/repository";
import { RelationshipRepository } from "../../repositories/relationship/types";
import { userRepository } from "../../repositories/user/repository";
import { UserRepository } from "../../repositories/user/types";

interface ListUserFollowersProps {
  page_token?: string;
  page_size?: number;
  user_id: string;
}

const USERS_PER_PAGE = 20;

export const makeListUserFollowers = (
  findManyRelationshipsByFollowing: RelationshipRepository["findManyByFollowing"],
  findManyUsersByIds: UserRepository["findManyByIds"]
) => {
  return async ({ user_id, page_token, page_size }: ListUserFollowersProps) => {
    const pageSize = page_size || USERS_PER_PAGE;

    const relationships = await findManyRelationshipsByFollowing({
      following_id: user_id,
      page_token,
      page_size: pageSize,
    });

    const users = await findManyUsersByIds(
      relationships.map((relationship) => relationship.follower_id)
    );

    const lastPageRelationship = relationships.at(-1);

    return {
      users: users.map((user) => ({ ...user, password: null })),
      next_page_token:
        relationships.length === pageSize
          ? lastPageRelationship?.follower_id
          : undefined,
    };
  };
};

export const listUserFollowers = makeListUserFollowers(
  relationshipRepository.findManyByFollowing,
  userRepository.findManyByIds
);
