import { describe, expect, it } from "vitest";
import { makePostRepositoryMock } from "../../repositories/post/mock";
import { makeCreatePost } from "./create-post.usecase";
import { makeUserRepositoryMock } from "../../../user/repositories/user/mock";

describe("create post usecase", () => {
  const postRepository = makePostRepositoryMock();
  const userRepository = makeUserRepositoryMock();

  const createPost = makeCreatePost(
    postRepository.create,
    userRepository.findOneById
  );

  it("should be able to create a post", async () => {
    userRepository.users?.push({
      id: "the-id",
      username: "foouser",
      display_name: "Foo",
      bio: "The foo user",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
      username_updated_at: null,
    });

    await expect(
      createPost({
        author_id: "the-id",
        content: "Good morning!",
      })
    ).resolves.toHaveProperty("id");

    expect(postRepository.posts).toHaveLength(1);
    expect(postRepository.posts?.[0]).toHaveProperty(
      "content",
      "Good morning!"
    );
  });

  it("should not be able to create post for nonexistent user", async () => {
    expect(
      createPost({
        author_id: "the-fake-id",
        content: "Good night!",
      })
    ).rejects.toHaveProperty("name", "user_not_found");
  });
});
