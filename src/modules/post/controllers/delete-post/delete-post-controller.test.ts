import request from "supertest";
import { user } from "@prisma/client";
import { beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../../app";

describe("delete post (e2e)", () => {
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

  it("should be able to delete post", async () => {
    const postResponse = await appRequest
      .post("/posts")
      .set("authorization", `Bearer ${token}`)
      .send({
        content: "Good morning!",
        author_id: author.id,
      });

    const deleteResponse = await appRequest
      .delete(`/posts/${postResponse.body.id}`)
      .set("authorization", `Bearer ${token}`)
      .send({
        author_id: author.id,
      });

    expect(deleteResponse.statusCode).toEqual(204);
  });
});
