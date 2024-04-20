import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../../app";

describe("get authenticated user (e2e)", () => {
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

  it("should be able to get authenticated user", async () => {
    const userResponse = await appRequest
      .get("/users/me")
      .set("authorization", `Bearer ${token}`)
      .send();

    expect(userResponse.statusCode).toEqual(200);
    expect(userResponse.body).toHaveProperty("username", "johndoe");
  });
});
