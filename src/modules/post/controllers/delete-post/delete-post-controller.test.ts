import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../../app";

describe("delete post (e2e)", () => {
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

  it("should be able to delete post", async () => {
    const postResponse = await appRequest
      .post("/posts")
      .set("authorization", `Bearer ${token}`)
      .send({
        content: "Good morning!",
      });

    const deleteResponse = await appRequest
      .delete(`/posts/${postResponse.body.id}`)
      .set("authorization", `Bearer ${token}`)
      .send();

    expect(deleteResponse.statusCode).toEqual(204);
  });
});
