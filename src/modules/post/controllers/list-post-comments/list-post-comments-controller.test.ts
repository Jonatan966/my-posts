import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../../app";

describe("list post comments (e2e)", () => {
  const appRequest = request(app.server);
  let token = "";

  beforeAll(async () => {
    await app.ready();

    await appRequest.post("/users").send({
      display_name: "John Doe",
      username: "johndoe",
      password: "foobar123",
      bio: "I am John Doe",
    });

    const authResponse = await appRequest.post("/users/auth").send({
      username: "johndoe",
      password: "foobar123",
    });

    token = authResponse.body.token;
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to list post comments", async () => {
    const originalPostResponse = await appRequest
      .post("/posts")
      .set("authorization", `Bearer ${token}`)
      .send({
        content: "Good morning!",
      });

    const originalPostId = originalPostResponse.body.id;

    const commentResponse = await appRequest
      .post("/posts")
      .set("authorization", `Bearer ${token}`)
      .send({
        content: "Yeah",
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
