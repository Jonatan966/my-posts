import request from "supertest";
import { user } from "@prisma/client";
import { beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../../app";

describe("create post (e2e)", () => {
  const appRequest = request(app);
  let author: user;

  beforeAll(async () => {
    const userResponse = await appRequest.post("/users").send({
      display_name: "John Doe",
      username: "johndoe",
      bio: "I am John Doe",
    });

    author = userResponse.body;
  });

  it("should be able to create post", async () => {
    const response = await appRequest.post("/posts").send({
      content: "Good morning!",
      author_id: author.id,
    });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty("id");
  });

  it("should be able to comment a post", async () => {
    const originalPostResponse = await appRequest.post("/posts").send({
      content: "Lady Gaga is the best!",
      author_id: author.id,
    });

    const originalPostId = originalPostResponse.body.id;

    const commentResponse = await appRequest.post("/posts").send({
      content: "This is so true!!",
      author_id: author.id,
      parent_post_id: originalPostId,
    });

    expect(commentResponse.statusCode).toEqual(201);
    expect(commentResponse.body).toMatchObject(
      expect.objectContaining({
        parent_post_id: originalPostId,
        root_post_id: originalPostId,
      })
    );
  });

  it("should be able to repost a post", async () => {
    const originalPostResponse = await appRequest.post("/posts").send({
      content: "I love Dua Lipa",
      author_id: author.id,
    });

    const originalPostId = originalPostResponse.body.id;

    const repostResponse = await appRequest.post("/posts").send({
      content: "Don't forget this!!",
      author_id: author.id,
      reposted_post_id: originalPostId,
    });

    expect(repostResponse.statusCode).toEqual(201);
    expect(repostResponse.body).toHaveProperty("id");
    expect(repostResponse.body).toHaveProperty(
      "reposted_post_id",
      originalPostId
    );
  });

  it("should be able to make repost without content", async () => {
    const originalPostResponse = await appRequest.post("/posts").send({
      content: "Future Nostalgia is the best album",
      author_id: author.id,
    });

    const originalPostId = originalPostResponse.body.id;

    const repostResponse = await appRequest.post("/posts").send({
      content: "",
      author_id: author.id,
      reposted_post_id: originalPostId,
    });

    expect(repostResponse.statusCode).toEqual(201);
    expect(repostResponse.body).toHaveProperty("id");
    expect(repostResponse.body).toHaveProperty(
      "reposted_post_id",
      originalPostId
    );
  });
});
