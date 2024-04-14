import request from "supertest";
import { user } from "@prisma/client";
import { beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../../app";

describe("list user posts (e2e)", () => {
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

  it("should be able to list user posts", async () => {
    await appRequest
      .post("/posts")
      .set("authorization", `Bearer ${token}`)
      .send({
        content: "Music!",
        author_id: author.id,
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
