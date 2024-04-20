import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../../app";

describe("list user posts (e2e)", () => {
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

  it("should be able to list user posts", async () => {
    await appRequest
      .post("/posts")
      .set("authorization", `Bearer ${token}`)
      .send({
        content: "Music!",
      });

    const postsResponse = await appRequest
      .get("/users/johndoe/posts")
      .set("authorization", `Bearer ${token}`)
      .send();

    expect(postsResponse.statusCode).toEqual(200);
    expect(postsResponse.body).toHaveProperty("posts");
    expect(postsResponse.body.posts).toHaveLength(1);
    expect(postsResponse.body.posts[0]).toHaveProperty("content", "Music!");
  });

  it("should not be able to list posts of unexistent user", async () => {
    const response = await appRequest
      .get("/users/foobar/posts")
      .set("authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(400);
    expect(response.body?.error).toHaveProperty("code", "user_not_found");
  });
});
