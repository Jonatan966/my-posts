import { describe, expect, it } from "vitest";
import { makePostRepositoryMock } from "../../repositories/post/mock";
import { makeGetPost } from "./get-post.usecase";

describe("get post usecase", () => {
  const postRepository = makePostRepositoryMock();

  const getPost = makeGetPost(postRepository.findOneById);

  it("should be able to get post", async () => {
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

    await expect(getPost("the-post-id")).resolves.toHaveProperty(
      "content",
      "Bla bla"
    );
  });

  it("should not be able to get nonexistent post", async () => {
    await expect(getPost("the-nonexistent-id")).rejects.toHaveProperty(
      "name",
      "post_not_found"
    );
  });

  it("should not be able to get deleted post", async () => {
    postRepository.posts?.push({
      id: "the-bla-id",
      author_id: "the-jonas-id",
      content: "Foo",
      created_at: new Date(),
      deleted_at: new Date(),
      is_edited: false,
      original_version_id: null,
      reposted_post_id: null,
      parent_post_id: null,
      root_post_id: null,
    });

    await expect(getPost("the-bla-id")).rejects.toHaveProperty(
      "name",
      "post_not_found"
    );
  });
});
