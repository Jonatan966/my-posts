import { AppError } from "../../../../utils/error";
import { UserModuleErrors } from "../../errors";
import { relationshipRepository } from "../../repositories/relationship/repository";
import { RelationshipRepository } from "../../repositories/relationship/types";
import { userRepository } from "../../repositories/user/repository";
import { UserRepository } from "../../repositories/user/types";

interface FollowUserDTO {
  follower_id: string;
  following_username: string;
}

export const makeFollowUser = (
  findOneRelationship: RelationshipRepository["findOne"],
  findOneUserByUsername: UserRepository["findOneByUsername"],
  createRelationship: RelationshipRepository["create"]
) => {
  return async ({ follower_id, following_username }: FollowUserDTO) => {
    const targetFollowingUser = await findOneUserByUsername(following_username);

    if (!targetFollowingUser) {
      throw new AppError(UserModuleErrors.user_not_found);
    }

    if (targetFollowingUser.id === follower_id) {
      throw new AppError(UserModuleErrors.user_not_able_to_follow);
    }

    const foundRelationship = await findOneRelationship(
      follower_id,
      targetFollowingUser.id
    );

    if (foundRelationship) {
      throw new AppError(UserModuleErrors.already_followed_user);
    }

    return await createRelationship({
      follower_id,
      following_id: targetFollowingUser.id,
    });
  };
};

export const followUser = makeFollowUser(
  relationshipRepository.findOne,
  userRepository.findOneByUsername,
  relationshipRepository.create
);
