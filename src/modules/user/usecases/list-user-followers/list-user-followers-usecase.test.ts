import { describe, expect, it } from "vitest";
import { makeListUserFollowers } from "./list-user-followers.usecase";
import { makeRelationshipRepositoryMock } from "../../repositories/relationship/mock";
import { makeUserRepositoryMock } from "../../repositories/user/mock";

describe("list user followers", () => {
  const userRepository = makeUserRepositoryMock();
  const relationshipRepository = makeRelationshipRepositoryMock();

  const listUserFollowersUsecase = makeListUserFollowers(
    relationshipRepository.findManyByFollowing,
    userRepository.findManyByIds
  );

  it("should be able to list user followers", async () => {
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

    const users = await listUserFollowersUsecase("the-bla-id");

    expect(users?.[0]).toHaveProperty("id", "the-id");
  });
});
