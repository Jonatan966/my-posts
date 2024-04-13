import request from "supertest";
import { beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../../app";

describe("get user by username (e2e)", () => {
  const appRequest = request(app);

  beforeAll(async () => {
    await appRequest.post("/users").send({
      display_name: "John Doe",
      username: "johndoe",
      bio: "I am John Doe",
    });
  });

  it("should be able to get user by username", async () => {
    const response = await appRequest.get("/users/johndoe").send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("display_name", "John Doe");
  });

  it("should not be able to get user by unexistent username", async () => {
    const response = await appRequest.get("/users/foobar").send();

    expect(response.statusCode).toEqual(400);
    expect(response.body?.error).toHaveProperty("code", "user_not_found");
  });
});
