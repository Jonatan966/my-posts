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

    const result = await listUserFollowingUsecase({ user_id: "the-id" });

    expect(result.users?.[0]).toHaveProperty("id", "the-bla-id");
  });

  it("should return next page token correctly", async () => {
    userRepository.users?.push(
      ...Array.from(new Array(25)).map((_, index) => ({
        id: `fofo-${index}`,
        username: "foouser",
        password: "foobar123",
        display_name: "Foo",
        bio: "The foo user",
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
        username_updated_at: null,
      }))
    );

    relationshipRepository.relationships?.push(
      ...Array.from(new Array(25)).map((_, index) => ({
        follower_id: "the-bob-id",
        following_id: `fofo-${index}`,
        created_at: new Date(),
      }))
    );

    const result = await listUserFollowingUsecase({ user_id: "the-bob-id" });

    expect(result.next_page_token).toEqual("fofo-19");
  });

  it("should be able to pass page token", async () => {
    const result = await listUserFollowingUsecase({
      user_id: "the-bob-id",
      page_token: "fofo-19",
    });

    expect(result.users[0]).toHaveProperty("id", "fofo-20");
  });

  it("should be able to set page size", async () => {
    const result = await listUserFollowingUsecase({
      user_id: "the-bob-id",
      page_size: 2,
    });

    expect(result.users).toHaveLength(2);
  });
});
