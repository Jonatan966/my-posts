import { describe, expect, it } from "vitest";
import { makePostRepositoryMock } from "../../repositories/post/mock";
import { makeCreatePost } from "./create-post.usecase";
import { makeUserRepositoryMock } from "../../../user/repositories/user/mock";

describe("create post usecase", () => {
  const postRepository = makePostRepositoryMock();
  const userRepository = makeUserRepositoryMock();

  const createPost = makeCreatePost(
    postRepository.create,
    postRepository.findOneById,
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

  it("should be able to repost a post", async () => {
    postRepository.posts?.push({
      id: "the-post-id",
      author_id: "the-jonas-id",
      content: "Bla bla",
      created_at: new Date(),
      deleted_at: null,
      is_edited: false,
      original_version_id: null,
      reposted_post_id: null,
    });

    await expect(
      createPost({
        author_id: "the-id",
        content: "Haha soo good!",
        reposted_post_id: "the-post-id",
      })
    ).resolves.toHaveProperty("reposted_post_id", "the-post-id");
  });

  it("should be able to repost a post without content", async () => {
    postRepository.posts?.push({
      id: "the-another-post-id",
      author_id: "the-jonas-id",
      content: "",
      created_at: new Date(),
      deleted_at: null,
      is_edited: false,
      original_version_id: null,
      reposted_post_id: null,
    });

    await expect(
      createPost({
        author_id: "the-id",
        content: "Haha lmfao!",
        reposted_post_id: "the-another-post-id",
      })
    ).resolves.toHaveProperty("reposted_post_id", "the-another-post-id");
  });

  it("should not be able to repost a nonexistent post", async () => {
    expect(
      createPost({
        author_id: "the-id",
        content: "Good night!",
        reposted_post_id: "the-foo-id",
      })
    ).rejects.toHaveProperty("name", "reposted_post_not_found");
  });

  it("should not be able to repost a old version of post", async () => {
    postRepository.posts?.push({
      id: "the-blabla-id",
      author_id: "the-id",
      content: "Foo",
      created_at: new Date(),
      deleted_at: null,
      is_edited: true,
      original_version_id: null,
      reposted_post_id: null,
    });

    expect(
      createPost({
        author_id: "the-id",
        content: "Good night!",
        reposted_post_id: "the-blabla-id",
      })
    ).rejects.toHaveProperty("name", "post_not_able_to_repost");
  });

  it("should not be able to create post for nonexistent user", async () => {
    expect(
      createPost({
        author_id: "the-fake-id",
        content: "Good night!",
      })
    ).rejects.toHaveProperty("name", "user_not_found");
  });

  it("should not be able to repost a repost without content", async () => {
    postRepository.posts?.push({
      id: "the-bla-id",
      author_id: "the-jonas-id",
      content: "",
      created_at: new Date(),
      deleted_at: null,
      is_edited: false,
      original_version_id: null,
      reposted_post_id: "the-repost-id",
    });

    expect(
      createPost({
        author_id: "the-id",
        content: "Good night!",
        reposted_post_id: "the-bla-id",
      })
    ).rejects.toHaveProperty("name", "repost_without_content");
  });
});
