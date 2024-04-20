import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../../app";

describe("get user by username (e2e)", () => {
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

  it("should be able to get user by username", async () => {
    const response = await appRequest
      .get("/users/johndoe")
      .set("authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("display_name", "John Doe");
  });

  it("should not be able to get user by unexistent username", async () => {
    const response = await appRequest
      .get("/users/foobar")
      .set("authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(400);
    expect(response.body?.error).toHaveProperty("code", "user_not_found");
  });
});
