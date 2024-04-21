import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../../app";

describe("list user following (e2e)", () => {
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

    await appRequest.post("/users").send({
      display_name: "Foo Bar",
      username: "foobar",
      password: "foobar123",
      bio: "I am the best",
    });

    const authResponse = await appRequest.post("/users/auth").send({
      username: "johndoe",
      password: "foobar123",
    });

    token = authResponse.body.token;

    await appRequest
      .post("/users/foobar/followers")
      .set("authorization", `Bearer ${token}`)
      .send();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to list user following", async () => {
    const followersResponse = await appRequest
      .get("/users/johndoe/following")
      .set("authorization", `Bearer ${token}`)
      .send();

    expect(followersResponse.statusCode).toEqual(200);
    expect(followersResponse.body.users?.[0]).toHaveProperty(
      "username",
      "foobar"
    );
  });
});
