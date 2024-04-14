import request from "supertest";
import { user } from "@prisma/client";
import { beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../../app";

describe("list post comments (e2e)", () => {
  const appRequest = request(app);
  let author: user;
  let token = "";

  beforeAll(async () => {
    const userResponse = await appRequest.post("/users").send({
      display_name: "John Doe",
      username: "johndoe",
      password: "foobar123",
      bio: "I am John Doe",
    });

    author = userResponse.body;

    const authResponse = await appRequest.post("/users/auth").send({
      username: "johndoe",
      password: "foobar123",
    });

    token = authResponse.body.token;
  });

  it("should be able to list post comments", async () => {
    const originalPostResponse = await appRequest
      .post("/posts")
      .set("authorization", `Bearer ${token}`)
      .send({
        content: "Good morning!",
        author_id: author.id,
      });

    const originalPostId = originalPostResponse.body.id;

    const commentResponse = await appRequest
      .post("/posts")
      .set("authorization", `Bearer ${token}`)
      .send({
        content: "Yeah",
        author_id: author.id,
        parent_post_id: originalPostId,
      });

    const commentId = commentResponse.body.id;

    const commentsResponse = await appRequest
      .get(`/posts/${originalPostId}/comments`)
      .set("authorization", `Bearer ${token}`)
      .send();

    expect(commentsResponse.statusCode).toEqual(200);
    expect(commentsResponse.body).toHaveProperty("comments");
    expect(commentsResponse.body.comments).toHaveLength(1);
    expect(commentsResponse.body.comments[0]).toHaveProperty("id", commentId);
  });
});
