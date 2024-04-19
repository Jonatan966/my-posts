import { describe, expect, it } from "vitest";
import { makeUserRepositoryMock } from "../../repositories/user/mock";
import { makeGetUserByUsername } from "./get-user-by-username.usecase";

describe("get user by username usecase", () => {
  const userRepository = makeUserRepositoryMock();

  const getUserByUsername = makeGetUserByUsername(
    userRepository.findOneByUsername
  );

  it("should be able to get user by username", async () => {
    userRepository.users?.push({
      id: "the-id",
      username: "foouser",
      password: "foobar123",
      display_name: "Foo",
      bio: "The foo user",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
      username_updated_at: null,
    });

    await expect(getUserByUsername("foouser")).resolves.toHaveProperty(
      "id",
      "the-id"
    );
  });

  it("should not be able to get nonexistent user", async () => {
    await expect(getUserByUsername("blabla")).rejects.toHaveProperty(
      "name",
      "user_not_found"
    );
  });

  it("should not be able to get deleted user", async () => {
    userRepository.users?.push({
      id: "the-bla-id",
      username: "blauser",
      password: "foobar123",
      display_name: "Bla",
      bio: "The bla user",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: new Date(),
      username_updated_at: null,
    });

    await expect(getUserByUsername("blauser")).rejects.toHaveProperty(
      "name",
      "user_not_found"
    );
  });
});
