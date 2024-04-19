import { describe, expect, it } from "vitest";
import { makeUserRepositoryMock } from "../../repositories/user/mock";
import { makeAuthenticateUser } from "./authenticate-user.usecase";
import { hash } from "bcrypt";

describe("authenticate user", () => {
  const userRepository = makeUserRepositoryMock();

  const authenticateUserUsecase = makeAuthenticateUser(
    userRepository.findOneByUsername
  );

  it("should be able to authenticate user", async () => {
    userRepository.users?.push({
      id: "the-id",
      username: "foouser",
      password: await hash("foo123", 12),
      display_name: "Foo",
      bio: "The foo user",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
      username_updated_at: null,
    });

    expect(
      authenticateUserUsecase({ username: "foouser", password: "foo123" })
    ).resolves.toHaveProperty("id", "the-id");
  });

  it("should not be able to authenticate with wrong password", async () => {
    expect(
      authenticateUserUsecase({ username: "foouser", password: "barbar" })
    ).rejects.toHaveProperty("name", "invalid_password");
  });

  it("should not be able to authenticate a unexistent user", async () => {
    expect(
      authenticateUserUsecase({ username: "unexistent", password: "bar456" })
    ).rejects.toHaveProperty("name", "user_not_found");
  });
});
