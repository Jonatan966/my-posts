import request from "supertest";
import { beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../../app";

describe("update username (e2e)", () => {
  const appRequest = request(app);

  beforeAll(async () => {
    await appRequest.post("/users").send({
      display_name: "John Doe",
      username: "johndoe",
      password: "foobar123",
      bio: "I am John Doe",
    });
  });

  it("should be able to update username", async () => {
    const response = await appRequest.patch("/users/johndoe/username").send({
      username: "thebest",
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("username", "thebest");
  });
});
