import { describe, expect, it } from "vitest";
import { makePostRepositoryMock } from "../../repositories/post/mock";
import { makeListPosts } from "./list-posts.usecase";

describe("list posts usecase", () => {
  const postsRepository = makePostRepositoryMock();

  const listPostsUsecase = makeListPosts(postsRepository.list);

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

    const result = await listPostsUsecase();

    expect(result.posts).toHaveLength(1);
    expect(result.next_page_token).toBeUndefined();
  });

  it("should return next page token correctly", async () => {
    postsRepository.posts?.push(
      ...Array.from(new Array(25)).map((_, index) => ({
        id: `fofo-${index}`,
        author_id: "barbar",
        content: "Bom dia",
        created_at: new Date(),
        deleted_at: null,
        is_edited: false,
        original_version_id: null,
        reposted_post_id: null,
        parent_post_id: null,
        root_post_id: null,
      }))
    );

    const result = await listPostsUsecase();

    expect(result.next_page_token).toEqual("fofo-18");
  });

  it("should be able to pass page token", async () => {
    const result = await listPostsUsecase({
      page_token: "fofo-5",
    });

    expect(result.posts[0]).toHaveProperty("id", "fofo-6");
  });

  it("should be able to set page size", async () => {
    const result = await listPostsUsecase({
      page_size: 2,
    });

    expect(result.posts).toHaveLength(2);
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

    const result = await listPostsUsecase({ author_id: "the-dam-id" });

    expect(result.posts).toHaveLength(1);
  });

  it("should be able to list comments", async () => {
    postsRepository.posts?.push({
      id: "kxqfya6b",
      author_id: "the-dam-id",
      content: "The comment",
      created_at: new Date(),
      deleted_at: null,
      is_edited: false,
      original_version_id: null,
      reposted_post_id: null,
      parent_post_id: "the-another-id",
      root_post_id: "the-another-id",
    });

    const result = await listPostsUsecase({ parent_post_id: "the-another-id" });

    expect(result.posts).toHaveLength(1);
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

    const result = await listPostsUsecase({
      author_id: "the-foo-id",
    });

    expect(result.posts).toHaveLength(0);
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

    const result = await listPostsUsecase({
      author_id: "the-bar-id",
    });

    expect(result.posts).toHaveLength(0);
  });
});
