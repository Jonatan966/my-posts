import request from "supertest";
import { beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../../app";

describe("edit post (e2e)", () => {
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

  it("should be able to edit post", async () => {
    const originalPostResponse = await appRequest
      .post("/posts")
      .set("authorization", `Bearer ${token}`)
      .send({
        content: "Good morning!",
      });

    const originalPostId = originalPostResponse.body.id;

    const editedPostResponse = await appRequest
      .put(`/posts/${originalPostId}`)
      .set("authorization", `Bearer ${token}`)
      .send({
        content: "Dua Lipa my beloved",
      });

    expect(editedPostResponse.statusCode).toEqual(200);
    expect(editedPostResponse.body.id).not.toEqual(originalPostId);
    expect(editedPostResponse.body).toHaveProperty(
      "original_version_id",
      originalPostId
    );
  });
});
