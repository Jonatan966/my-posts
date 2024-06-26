import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../../app";

describe("create user (e2e)", () => {
  const appRequest = request(app.server);

  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create user", async () => {
    const response = await appRequest.post("/users").send({
      display_name: "John Doe",
      username: "johndoe",
      password: "foobar123",
      bio: "I am John Doe",
    });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty("id");
  });

  it("should not be able to create a user with same username", async () => {
    const response = await appRequest.post("/users").send({
      display_name: "Foo Bar",
      username: "johndoe",
      password: "foobar123",
      bio: "I am Foo Bar",
    });

    expect(response.statusCode).toEqual(400);
    expect(response.body?.error).toHaveProperty("code", "user_already_exists");
  });

  it("should not be able to create a user without username", async () => {
    const response = await appRequest.post("/users").send({
      display_name: "Lady Gaga",
      username: "",
      password: "foobar123",
    });

    expect(response.statusCode).toEqual(400);
    expect(response.body?.error).toHaveProperty("code", "validation_error");
  });

  it("should not be able to put spaces in username", async () => {
    const response = await appRequest.post("/users").send({
      display_name: "Beyonocé",
      username: "   ",
      password: "foobar123",
    });

    expect(response.statusCode).toEqual(400);
    expect(response.body?.error).toHaveProperty("code", "validation_error");
  });
});
