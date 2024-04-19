import { describe, expect, it } from "vitest";
import { makeUserRepositoryMock } from "../../repositories/user/mock";
import { makeUpdateUser } from "./update-user.usecase";

describe("update user usecase", () => {
  const userRepository = makeUserRepositoryMock();

  const updateUser = makeUpdateUser(
    userRepository.findOneById,
    userRepository.update
  );

  it("should be able to update a user", async () => {
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

    await updateUser({
      id: "the-id",
      display_name: "The Foo",
      bio: "The Foo is the best",
    });

    expect(userRepository.users?.[0]).toHaveProperty("display_name", "The Foo");
    expect(userRepository.users?.[0]).toHaveProperty(
      "bio",
      "The Foo is the best"
    );
  });

  it("should not be able to update nonexistent user", async () => {
    expect(
      updateUser({
        id: "bar-user-id",
        display_name: "The Nonexistent Bar",
      })
    ).rejects.toHaveProperty("name", "user_not_found");
  });
});
