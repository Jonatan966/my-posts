import request from "supertest";
import { beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../../app";

describe("create post (e2e)", () => {
  const appRequest = request(app);
  let token = "";

  beforeAll(async () => {
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

  it("should be able to create post", async () => {
    const response = await appRequest
      .post("/posts")
      .set("authorization", `Bearer ${token}`)
      .send({
        content: "Good morning!",
      });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty("id");
  });

  it("should be able to comment a post", async () => {
    const originalPostResponse = await appRequest
      .post("/posts")
      .set("authorization", `Bearer ${token}`)
      .send({
        content: "Lady Gaga is the best!",
      });

    const originalPostId = originalPostResponse.body.id;

    const commentResponse = await appRequest
      .post("/posts")
      .set("authorization", `Bearer ${token}`)
      .send({
        content: "This is so true!!",
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
    const originalPostResponse = await appRequest
      .post("/posts")
      .set("authorization", `Bearer ${token}`)
      .send({
        content: "I love Dua Lipa",
      });

    const originalPostId = originalPostResponse.body.id;

    const repostResponse = await appRequest
      .post("/posts")
      .set("authorization", `Bearer ${token}`)
      .send({
        content: "Don't forget this!!",
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
    const originalPostResponse = await appRequest
      .post("/posts")
      .set("authorization", `Bearer ${token}`)
      .send({
        content: "Future Nostalgia is the best album",
      });

    const originalPostId = originalPostResponse.body.id;

    const repostResponse = await appRequest
      .post("/posts")
      .set("authorization", `Bearer ${token}`)
      .send({
        content: "",
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
