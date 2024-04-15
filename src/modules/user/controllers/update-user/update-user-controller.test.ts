import request from "supertest";
import { beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../../app";

describe("update user (e2e)", () => {
  const appRequest = request(app);
  let token = "";

  beforeAll(async () => {
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

  it("should be able to update user", async () => {
    const response = await appRequest
      .put("/users/me")
      .set("authorization", `Bearer ${token}`)
      .send({
        bio: "I am the best!",
        display_name: "The Best",
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        bio: "I am the best!",
        display_name: "The Best",
      })
    );
  });
});
