import { describe, expect, it } from "vitest";
import { makeUserRepositoryMock } from "../../repositories/user/mock";
import { makeUpdatePassword } from "./update-password.usecase";
import { compare, hash } from "bcrypt";

describe("update password usecase", () => {
  const userRepository = makeUserRepositoryMock();

  const updatePasswordUsecase = makeUpdatePassword(
    userRepository.findOneById,
    userRepository.update
  );

  it("should be able to update password", async () => {
    userRepository.users?.push({
      id: "the-id",
      username: "foouser",
      password: await hash("foobar", 12),
      display_name: "Foo",
      bio: "The foo user",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
      username_updated_at: null,
    });

    await updatePasswordUsecase({
      user_id: "the-id",
      new_password: "barfoo",
    });

    const isValidPassword = await compare(
      "barfoo",
      userRepository.users![0].password
    );

    expect(isValidPassword).toEqual(true);
  });

  it("should not be able to put same password", async () => {
    expect(
      updatePasswordUsecase({
        user_id: "the-id",
        new_password: "barfoo",
      })
    ).rejects.toHaveProperty("name", "same_password");
  });

  it("should not be able to update password of unexistent user", async () => {
    expect(
      updatePasswordUsecase({
        user_id: "the-random",
        new_password: "bla",
      })
    ).rejects.toHaveProperty("name", "user_not_found");
  });
});
