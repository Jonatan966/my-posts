import request from "supertest";
import { beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../../app";

describe("authenticate user (e2e)", () => {
  const appRequest = request(app);

  beforeAll(async () => {
    await appRequest.post("/users").send({
      display_name: "John Doe",
      username: "johndoe",
      password: "foobar123",
      bio: "I am John Doe",
    });
  });

  it("should be able to authenticate user", async () => {
    const authResponse = await appRequest.post("/users/auth").send({
      username: "johndoe",
      password: "foobar123",
    });

    expect(authResponse.statusCode).toEqual(200);
    expect(authResponse.body).toEqual({
      token: expect.any(String),
    });
  });

  it("should not be able to authenticate user with wrong password", async () => {
    const authResponse = await appRequest.post("/users/auth").send({
      username: "johndoe",
      password: "wrong",
    });

    expect(authResponse.statusCode).toEqual(401);
    expect(authResponse.body.error).toHaveProperty("code", "invalid_password");
  });

  it("should not be able to authenticate unexistent user", async () => {
    const authResponse = await appRequest.post("/users/auth").send({
      username: "doedoe",
      password: "foobar123",
    });

    expect(authResponse.statusCode).toEqual(400);
    expect(authResponse.body.error).toHaveProperty("code", "user_not_found");
  });
});
