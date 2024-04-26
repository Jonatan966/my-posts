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

    const result = await listUsersUsecase({
      querySearch: "foo",
    });

    expect(result.users).toHaveLength(1);
    expect(result.next_page_token).toBeUndefined();
  });

  it("should be able to search specific user", async () => {
    usersRepository.users?.push(
      {
        id: "the-asdasda",
        username: "sheyla2024",
        password: "foobar123",
        display_name: "Sheyla",
        bio: "The foo user",
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
        username_updated_at: null,
      },
      {
        id: "the-adsdww",
        username: "sheyla2124",
        password: "foobar123",
        display_name: "Sheyla",
        bio: "The foo user",
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
        username_updated_at: null,
      }
    );

    const result = await listUsersUsecase({
      querySearch: "sheyla20",
    });

    expect(result.users).toHaveLength(1);
    expect(result.users[0]).toHaveProperty("username", "sheyla2024");
  });

  it("should return next page token correctly", async () => {
    usersRepository.users?.push(
      ...Array.from(new Array(25)).map((_, index) => ({
        id: `fofo-${index}`,
        username: "cristina",
        password: "foobar123",
        display_name: "Cristina",
        bio: "The foo user",
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
        username_updated_at: null,
      }))
    );

    const result = await listUsersUsecase({
      querySearch: "cristina",
    });

    expect(result.next_page_token).toEqual("fofo-19");
  });

  it("should be able to pass page token", async () => {
    const result = await listUsersUsecase({
      page_token: "fofo-5",
    });

    expect(result.users[0]).toHaveProperty("id", "fofo-6");
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

    const result = await listUsersUsecase({
      querySearch: "ciclano",
    });

    expect(result.users).toHaveLength(0);
  });
});
