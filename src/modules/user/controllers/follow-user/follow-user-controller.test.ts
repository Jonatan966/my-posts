import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../../app";

describe("follow user (e2e)", () => {
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
      password: "blabla",
      bio: "I am Foo Bar!",
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

  it("should be able to follow user", async () => {
    const response = await appRequest
      .post("/users/foobar/followers")
      .set("authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(204);
  });
});
