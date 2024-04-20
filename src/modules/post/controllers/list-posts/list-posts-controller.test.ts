import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../../app";

describe("list posts (e2e)", () => {
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

  it("should be able to list posts", async () => {
    await appRequest
      .post("/posts")
      .set("authorization", `Bearer ${token}`)
      .send({
        content: "Born this Way is the best music album!",
      });

    const postsResponse = await appRequest
      .get("/users/johndoe/posts")
      .set("authorization", `Bearer ${token}`)
      .send();

    expect(postsResponse.statusCode).toEqual(200);
    expect(postsResponse.body).toHaveProperty("posts");
    expect(postsResponse.body.posts).toHaveLength(1);
    expect(postsResponse.body.posts[0]).toHaveProperty(
      "content",
      "Born this Way is the best music album!"
    );
  });
});
