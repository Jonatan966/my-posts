import { describe, expect, it } from "vitest";
import { makeUserRepositoryMock } from "../../repositories/user/mock";
import { makeUpdateUsername } from "./update-username.usecase";

describe("update user usecase", () => {
  const userRepository = makeUserRepositoryMock();

  const updateUsername = makeUpdateUsername(
    userRepository.update,
    userRepository.findOneByUsername,
    userRepository.findOneById
  );

  it("should be able to update username", async () => {
    userRepository.users?.push({
      id: "the-bar-user",
      bio: "This is the bar user",
      username: "barbar2024",
      display_name: "Bar",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    await updateUsername({
      id: "the-bar-user",
      username: "thebar",
    });

    expect(userRepository.users?.[0]).toHaveProperty("username", "thebar");
  });

  it("should not be able to update unexistent user", async () => {
    expect(
      updateUsername({
        id: "the-unexistent-bar",
        username: "ladygaga",
      })
    ).rejects.toHaveProperty("name", "user_not_found");
  });

  it("should not be able to use existent username", async () => {
    userRepository.users?.push({
      id: "the-bon-user",
      bio: "This is the bon user",
      username: "bonthisway",
      display_name: "Bon",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    expect(
      updateUsername({
        id: "the-bon-user",
        username: "thebar",
      })
    ).rejects.toHaveProperty("name", "user_already_exists");
  });
});
