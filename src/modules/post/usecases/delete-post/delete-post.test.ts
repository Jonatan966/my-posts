import { describe, expect, it } from "vitest";
import { makePostRepositoryMock } from "../../repositories/post/mock";
import { makeDeletePost } from "./delete-post.usecase";

describe("delete post usecase", () => {
  const postRepository = makePostRepositoryMock();

  const deletePost = makeDeletePost(
    postRepository.delete,
    postRepository.findOneById
  );

  it("should be able to delete a post", async () => {
    postRepository.posts?.push({
      id: "the-post-id",
      author_id: "the-user-id",
      content: "I love Lady Gaga!",
      created_at: new Date(),
      deleted_at: null,
      is_edited: false,
      original_version_id: null,
    });

    await deletePost({
      author_id: "the-user-id",
      post_id: "the-post-id",
    });

    expect(postRepository.posts).toHaveLength(0);
  });

  it("should not be able to delete a previous deleted post", async () => {
    expect(
      deletePost({
        author_id: "the-user-id",
        post_id: "the-post-id",
      })
    ).rejects.toHaveProperty("name", "post_not_found");
  });

  it("should not be able to delete a nonexistent post", async () => {
    expect(
      deletePost({
        author_id: "the-user-id",
        post_id: "the-mister-id",
      })
    ).rejects.toHaveProperty("name", "post_not_found");
  });

  it("should not be able to delete post of another user", async () => {
    postRepository.posts?.push(
      {
        id: "the-bla-id",
        author_id: "the-big-id",
        content: "I love Beyoncé!",
        created_at: new Date(),
        deleted_at: null,
        is_edited: false,
        original_version_id: null,
      },
      {
        id: "the-fake-id",
        author_id: "the-bang-id",
        content: "I love Ellie Goulding!",
        created_at: new Date(),
        deleted_at: null,
        is_edited: false,
        original_version_id: null,
      }
    );

    expect(
      deletePost({
        author_id: "the-bang-id",
        post_id: "the-bla-id",
      })
    ).rejects.toHaveProperty("name", "post_not_able_to_delete");
  });

  it("should not be able to delete old post version", async () => {
    postRepository.posts?.push({
      id: "the-old-id",
      author_id: "the-big-id",
      content: "I love Ava Max!",
      created_at: new Date(),
      deleted_at: null,
      is_edited: true,
      original_version_id: "the-bob-id",
    });

    expect(
      deletePost({
        author_id: "the-big-id",
        post_id: "the-old-id",
      })
    ).rejects.toHaveProperty("name", "post_not_able_to_delete");
  });
});
