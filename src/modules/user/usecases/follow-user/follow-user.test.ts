import { describe, expect, it } from "vitest";
import { makeRelationshipRepositoryMock } from "../../repositories/relationship/mock";
import { makeFollowUser } from "./follow-user.usecase";
import { makeUserRepositoryMock } from "../../repositories/user/mock";

describe("follow user usecase", () => {
  const relationshipRepository = makeRelationshipRepositoryMock();
  const userRepository = makeUserRepositoryMock();

  const followUserUsecase = makeFollowUser(
    relationshipRepository.findOne,
    userRepository.findOneByUsername,
    relationshipRepository.create
  );

  it("should be able to follow user", async () => {
    userRepository.users?.push(
      {
        id: "the-id",
        username: "foouser",
        password: "foobar123",
        display_name: "Foo",
        bio: "The foo user",
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
        username_updated_at: null,
      },
      {
        id: "the-bla-id",
        username: "blauser",
        password: "foobar123",
        display_name: "Bla",
        bio: "The bla user",
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: new Date(),
        username_updated_at: null,
      }
    );

    await expect(
      followUserUsecase({
        follower_id: "the-id",
        following_username: "blauser",
      })
    ).resolves.toHaveProperty("created_at");
  });

  it("should not be able to follow same user", async () => {
    await expect(
      followUserUsecase({
        follower_id: "the-id",
        following_username: "blauser",
      })
    ).rejects.toHaveProperty("name", "already_followed_user");
  });

  it("should not be able to follow itself", async () => {
    await expect(
      followUserUsecase({
        follower_id: "the-id",
        following_username: "foouser",
      })
    ).rejects.toHaveProperty("name", "user_not_able_to_follow");
  });

  it("should not be able to follow nonexistent user", async () => {
    await expect(
      followUserUsecase({
        follower_id: "the-id",
        following_username: "nonexistent",
      })
    ).rejects.toHaveProperty("name", "user_not_found");
  });
});
