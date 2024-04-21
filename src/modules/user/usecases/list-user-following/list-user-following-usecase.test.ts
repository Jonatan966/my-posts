import { describe, expect, it } from "vitest";
import { makeListUserFollowing } from "./list-user-following.usecase";
import { makeRelationshipRepositoryMock } from "../../repositories/relationship/mock";
import { makeUserRepositoryMock } from "../../repositories/user/mock";

describe("list user following", () => {
  const userRepository = makeUserRepositoryMock();
  const relationshipRepository = makeRelationshipRepositoryMock();

  const listUserFollowingUsecase = makeListUserFollowing(
    relationshipRepository.findManyByFollower,
    userRepository.findManyByIds
  );

  it("should be able to list user following", async () => {
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
        deleted_at: null,
        username_updated_at: null,
      }
    );

    relationshipRepository.relationships?.push({
      follower_id: "the-id",
      following_id: "the-bla-id",
      created_at: new Date(),
    });

    const users = await listUserFollowingUsecase("the-id");

    expect(users?.[0]).toHaveProperty("id", "the-bla-id");
  });
});
