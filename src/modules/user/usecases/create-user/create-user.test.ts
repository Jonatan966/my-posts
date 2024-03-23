import { expect, it, describe } from "vitest";
import { makeUserRepositoryMock } from "../../repositories/user/mock";
import { makeCreateUser } from "./create-user.usecase";

describe("create user usecase", () => {
  const userRepository = makeUserRepositoryMock();

  const createUserUsecase = makeCreateUser(
    userRepository.findOneByUsername,
    userRepository.create
  );

  it("should be able to create a user", async () => {
    await createUserUsecase({
      display_name: "john",
      username: "The John",
      bio: "This is John",
    });

    expect(userRepository.users).toHaveLength(1);
    expect(userRepository.users?.[0]).toHaveProperty("id");
  });

  it("should not be able to create a user with same username", async () => {
    expect(
      createUserUsecase({
        display_name: "john",
        username: "The John",
        bio: "This is John",
      })
    ).rejects.toHaveProperty("name", "user_already_exists");
  });
});
