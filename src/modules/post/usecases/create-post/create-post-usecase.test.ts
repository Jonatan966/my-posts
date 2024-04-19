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
      password: "foobar123",
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
      parent_post_id: null,
      root_post_id: null,
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
      parent_post_id: null,
      root_post_id: null,
    });

    await expect(
      createPost({
        author_id: "the-id",
        content: "Haha lmfao!",
        reposted_post_id: "the-another-post-id",
      })
    ).resolves.toHaveProperty("reposted_post_id", "the-another-post-id");
  });

  it("should be able to comment a post", async () => {
    postRepository.posts?.push({
      id: "jpvfqd2e",
      author_id: "the-jonas-id",
      content: "Lady Gaga is comming!!",
      created_at: new Date(),
      deleted_at: null,
      is_edited: false,
      original_version_id: null,
      reposted_post_id: null,
      parent_post_id: null,
      root_post_id: null,
    });

    await expect(
      createPost({
        author_id: "the-id",
        content: "Haha lol!",
        parent_post_id: "jpvfqd2e",
      })
    ).resolves.toEqual(
      expect.objectContaining({
        parent_post_id: "jpvfqd2e",
        root_post_id: "jpvfqd2e",
      })
    );
  });

  it("should be able to comment a comment", async () => {
    postRepository.posts?.push({
      id: "rxebmkhk",
      author_id: "the-jonas-id",
      content: "Beyoncé is comming!!",
      created_at: new Date(),
      deleted_at: null,
      is_edited: false,
      original_version_id: null,
      reposted_post_id: null,
      parent_post_id: "jpvfqd2e",
      root_post_id: "jpvfqd2e",
    });

    await expect(
      createPost({
        author_id: "the-id",
        content: "Haha yessss!",
        parent_post_id: "rxebmkhk",
      })
    ).resolves.toEqual(
      expect.objectContaining({
        parent_post_id: "rxebmkhk",
        root_post_id: "jpvfqd2e",
      })
    );
  });

  it("should be able to comment a repost with content", async () => {
    postRepository.posts?.push({
      id: "gua5wsdd",
      author_id: "the-jonas-id",
      content: "Britney Spears!!",
      created_at: new Date(),
      deleted_at: null,
      is_edited: false,
      original_version_id: null,
      reposted_post_id: "the-post-id",
      parent_post_id: null,
      root_post_id: null,
    });

    await expect(
      createPost({
        author_id: "the-id",
        content: "I love soo much!",
        parent_post_id: "gua5wsdd",
      })
    ).resolves.toEqual(
      expect.objectContaining({
        parent_post_id: "gua5wsdd",
        root_post_id: "gua5wsdd",
      })
    );
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
      parent_post_id: null,
      root_post_id: null,
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
      parent_post_id: null,
      root_post_id: null,
    });

    expect(
      createPost({
        author_id: "the-id",
        content: "Good night!",
        reposted_post_id: "the-bla-id",
      })
    ).rejects.toHaveProperty("name", "repost_without_content");
  });

  it("should not be able to comment a nonexistent parent post", async () => {
    expect(
      createPost({
        author_id: "the-id",
        content: "Good night!",
        parent_post_id: "the-nonexistent",
      })
    ).rejects.toHaveProperty("name", "parent_post_not_found");
  });

  it("should not be able to comment a old version of parent post", async () => {
    postRepository.posts?.push({
      id: "the-old-id",
      author_id: "the-jonas-id",
      content: "Good!",
      created_at: new Date(),
      deleted_at: null,
      is_edited: true,
      original_version_id: null,
      reposted_post_id: null,
      parent_post_id: null,
      root_post_id: null,
    });

    expect(
      createPost({
        author_id: "the-id",
        content: "Kim Petras!",
        parent_post_id: "the-old-id",
      })
    ).rejects.toHaveProperty("name", "parent_post_not_able_to_comment");
  });

  it("should not be able to comment a repost without content", async () => {
    postRepository.posts?.push({
      id: "3edzafrd",
      author_id: "the-jonas-id",
      content: "",
      created_at: new Date(),
      deleted_at: null,
      is_edited: false,
      original_version_id: null,
      reposted_post_id: "the-repost-id",
      parent_post_id: null,
      root_post_id: null,
    });

    expect(
      createPost({
        author_id: "the-id",
        content: "Good night!",
        parent_post_id: "3edzafrd",
      })
    ).rejects.toHaveProperty("name", "parent_repost_without_content");
  });
});
