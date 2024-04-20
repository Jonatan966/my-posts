import { describe, expect, it } from "vitest";
import { makeUserRepositoryMock } from "../../repositories/user/mock";
import { makeListUsers } from "./list-users.usecase";

describe("list users usecase", () => {
  const usersRepository = makeUserRepositoryMock();

  const listUsersUsecase = makeListUsers(usersRepository.findMany);

  it("should be able to list users", async () => {
    usersRepository.users?.push({
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

    const result = await listUsersUsecase();

    expect(result.users).toHaveLength(1);
  });

  it("should not be able to list deleted users", async () => {
    usersRepository.users?.push({
      id: "the-ciclano",
      username: "ciclano12",
      password: "ciclaninho",
      display_name: "Ciclano da SILVA",
      bio: "The Ciclano",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: new Date(),
      username_updated_at: null,
    });

    const result = await listUsersUsecase();

    expect(result.users).toHaveLength(1);
  });
});
