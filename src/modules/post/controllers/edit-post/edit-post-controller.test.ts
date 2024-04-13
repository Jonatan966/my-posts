import request from "supertest";
import { user } from "@prisma/client";
import { beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../../app";

describe("edit post (e2e)", () => {
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

  it("should be able to edit post", async () => {
    const originalPostResponse = await appRequest.post("/posts").send({
      content: "Good morning!",
      author_id: author.id,
    });

    const originalPostId = originalPostResponse.body.id;

    const editedPostResponse = await appRequest
      .put(`/posts/${originalPostId}`)
      .send({
        content: "Dua Lipa my beloved",
        author_id: author.id,
      });

    expect(editedPostResponse.statusCode).toEqual(200);
    expect(editedPostResponse.body.id).not.toEqual(originalPostId);
    expect(editedPostResponse.body).toHaveProperty(
      "original_version_id",
      originalPostId
    );
  });
});