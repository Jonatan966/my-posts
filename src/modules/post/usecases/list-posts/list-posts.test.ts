import { describe, expect, it } from "vitest";
import { makePostRepositoryMock } from "../../repositories/post/mock";
import { makeListPosts } from "./list-posts.usecase";

describe("list posts usecase", () => {
  const postsRepository = makePostRepositoryMock();

  const listPosts = makeListPosts(postsRepository.list);

  it("should be able to list posts", async () => {
    postsRepository.posts?.push({
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

    await expect(listPosts()).resolves.toHaveLength(1);
  });

  it("should be able to list specific user posts", async () => {
    postsRepository.posts?.push({
      id: "the-another-id",
      author_id: "the-dam-id",
      content: "Bla foo",
      created_at: new Date(),
      deleted_at: null,
      is_edited: false,
      original_version_id: null,
      reposted_post_id: null,
      parent_post_id: null,
      root_post_id: null,
    });

    await expect(listPosts({ author_id: "the-dam-id" })).resolves.toHaveLength(
      1
    );
  });

  it("should not be able to list deleted posts", async () => {
    postsRepository.posts?.push({
      id: "di969sw0",
      author_id: "the-foo-id",
      content: "Rihanna",
      created_at: new Date(),
      deleted_at: new Date(),
      is_edited: false,
      original_version_id: null,
      reposted_post_id: null,
      parent_post_id: null,
      root_post_id: null,
    });

    await expect(listPosts()).resolves.toHaveLength(2);
  });

  it("should not be able to list edited posts", async () => {
    postsRepository.posts?.push({
      id: "egt5lkyj",
      author_id: "the-bar-id",
      content: "Beyoncé",
      created_at: new Date(),
      deleted_at: null,
      is_edited: true,
      original_version_id: null,
      reposted_post_id: null,
      parent_post_id: null,
      root_post_id: null,
    });

    await expect(listPosts()).resolves.toHaveLength(2);
  });
});
