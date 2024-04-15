import { describe, expect, it } from "vitest";
import { makeUserRepositoryMock } from "../../repositories/user/mock";
import { makeGetUserById } from "./get-user-by-id.usecase";

describe("get user by id", () => {
  const userRepository = makeUserRepositoryMock();

  const getUserByIdUsecase = makeGetUserById(userRepository.findOneById);

  it("should be able to get user by id", async () => {
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

    await expect(getUserByIdUsecase("the-id")).resolves.toHaveProperty(
      "username",
      "foouser"
    );
  });

  it("should not be able to get nonexistent user", async () => {
    await expect(getUserByIdUsecase("blabla")).rejects.toHaveProperty(
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

    await expect(getUserByIdUsecase("the-bla-id")).rejects.toHaveProperty(
      "name",
      "user_not_found"
    );
  });
});
