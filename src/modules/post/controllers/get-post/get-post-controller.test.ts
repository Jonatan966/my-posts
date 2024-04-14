import request from "supertest";
import { user } from "@prisma/client";
import { beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../../app";

describe("get post (e2e)", () => {
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

  it("should be able to get post", async () => {
    const createdPostResponse = await appRequest.post("/posts").send({
      content: "Good morning!",
      author_id: author.id,
    });

    const createdPostId = createdPostResponse.body.id;

    const retrievedPostResponse = await appRequest
      .get(`/posts/${createdPostId}`)
      .send();

    expect(retrievedPostResponse.statusCode).toEqual(200);
    expect(retrievedPostResponse.body).toHaveProperty(
      "content",
      "Good morning!"
    );
  });
});
