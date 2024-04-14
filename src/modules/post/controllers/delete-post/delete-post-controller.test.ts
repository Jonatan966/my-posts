import request from "supertest";
import { user } from "@prisma/client";
import { beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../../app";

describe("delete post (e2e)", () => {
  const appRequest = request(app);
  let author: user;

  beforeAll(async () => {
    const userResponse = await appRequest.post("/users").send({
      display_name: "John Doe",
      username: "johndoe",
      password: "foobar123",
      bio: "I am John Doe",
    });

    author = userResponse.body;
  });

  it("should be able to delete post", async () => {
    const postResponse = await appRequest.post("/posts").send({
      content: "Good morning!",
      author_id: author.id,
    });

    const deleteResponse = await appRequest
      .delete(`/posts/${postResponse.body.id}`)
      .send({
        author_id: author.id,
      });

    expect(deleteResponse.statusCode).toEqual(204);
  });
});
