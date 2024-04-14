import request from "supertest";
import { user } from "@prisma/client";
import { beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../../app";

describe("list posts (e2e)", () => {
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

  it("should be able to list posts", async () => {
    await appRequest.post("/posts").send({
      content: "Born this Way is the best music album!",
      author_id: author.id,
    });

    const postsResponse = await appRequest.get("/users/johndoe/posts").send();

    expect(postsResponse.statusCode).toEqual(200);
    expect(postsResponse.body).toHaveProperty("posts");
    expect(postsResponse.body.posts).toHaveLength(1);
    expect(postsResponse.body.posts[0]).toHaveProperty(
      "content",
      "Born this Way is the best music album!"
    );
  });
});
