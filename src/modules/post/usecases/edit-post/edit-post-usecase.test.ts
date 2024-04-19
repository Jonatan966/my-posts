import { describe, expect, it } from "vitest";
import { makePostRepositoryMock } from "../../repositories/post/mock";
import { makeEditPost } from "./edit-post.usecase";

describe("edit post usecase", () => {
  const postRepository = makePostRepositoryMock();

  const editPost = makeEditPost(
    postRepository.findOneById,
    postRepository.update,
    postRepository.create
  );

  it("should be able to edit post", async () => {
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

    await editPost({
      id: "the-post-id",
      author_id: "the-jonas-id",
      content: "Lady Gaga is the best!",
    });

    expect(postRepository.posts?.[0]).toHaveProperty("is_edited", true);

    expect(postRepository.posts?.[1]).toHaveProperty(
      "content",
      "Lady Gaga is the best!"
    );
    expect(postRepository.posts?.[1]).toHaveProperty(
      "original_version_id",
      "the-post-id"
    );
  });

  it("should be able to edit a repost without content", async () => {
    postRepository.posts?.push({
      id: "azyipor0",
      author_id: "the-jonas-id",
      content: "",
      created_at: new Date(),
      deleted_at: null,
      is_edited: false,
      original_version_id: null,
      reposted_post_id: "the-post-id",
      parent_post_id: null,
      root_post_id: null,
    });

    await expect(
      editPost({
        id: "azyipor0",
        author_id: "the-jonas-id",
        content: "Katy Perry!",
      })
    ).resolves.toHaveProperty("id", "azyipor0");
  });

  it("should not be able to edit nonexistent post", async () => {
    expect(
      editPost({
        id: "the-nonexistent-id",
        author_id: "the-jonas-id",
        content: "Lady Gaga is not the best :(",
      })
    ).rejects.toHaveProperty("name", "post_not_found");
  });

  it("should not be able to edit post of another author", async () => {
    postRepository.posts?.push({
      id: "the-another-post-id",
      author_id: "the-jonas-id",
      content: "Bobo",
      created_at: new Date(),
      deleted_at: null,
      is_edited: false,
      original_version_id: null,
      reposted_post_id: null,
      parent_post_id: null,
      root_post_id: null,
    });

    expect(
      editPost({
        id: "the-another-post-id",
        author_id: "the-fred-id",
        content: "The Weeknd is the best!",
      })
    ).rejects.toHaveProperty("name", "post_not_able_to_edit");
  });

  it("should not be able to edit old post version", async () => {
    expect(
      editPost({
        id: "the-post-id",
        author_id: "the-jonas-id",
        content: "Ariana Grande is the best!",
      })
    ).rejects.toHaveProperty("name", "post_already_edited");
  });
});
