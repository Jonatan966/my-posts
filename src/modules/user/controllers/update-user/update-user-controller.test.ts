import request from "supertest";
import { beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../../app";

describe("update user (e2e)", () => {
  const appRequest = request(app);

  beforeAll(async () => {
    await appRequest.post("/users").send({
      display_name: "John Doe",
      username: "johndoe",
      bio: "I am John Doe",
    });
  });

  it("should be able to update user", async () => {
    const response = await appRequest.put("/users/johndoe").send({
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
