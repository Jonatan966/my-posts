import { Request, Response } from "express";
import { createUser } from "../../usecases/create-user/create-user.usecase";
import { z } from "zod";

export const createUserController = async (
  request: Request,
  response: Response
) => {
  const userSchema = z.object({
    display_name: z.string(),
    username: z.string(),
    bio: z.string().optional(),
  });

  const userPayload = await userSchema.parseAsync(request.body);

  const createdUser = await createUser(userPayload);

  return response.status(201).json(createdUser);
};
