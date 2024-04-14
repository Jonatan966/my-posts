import { expect, it, describe } from "vitest";
import { makeUserRepositoryMock } from "../../repositories/user/mock";
import { makeCreateUser } from "./create-user.usecase";
import { compare } from "bcrypt";

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
      password: "foobar",
      bio: "This is John",
    });
    console.log(userRepository.users![0].password);
    const isValidPassword = await compare(
      "foobar",
      userRepository.users![0].password
    );

    expect(userRepository.users).toHaveLength(1);
    expect(userRepository.users?.[0]).toHaveProperty("id");
    expect(isValidPassword).toEqual(true);
  });

  it("should not be able to create a user with same username", async () => {
    expect(
      createUserUsecase({
        display_name: "john",
        username: "The John",
        password: "foobar",
        bio: "This is John",
      })
    ).rejects.toHaveProperty("name", "user_already_exists");
  });
});
