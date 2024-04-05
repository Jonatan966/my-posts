import { Request, Response } from "express";
import { z } from "zod";
import { getUserByUsername } from "../../usecases/get-user-by-username/get-user-by-username.usecase";

export const getUserByUsernameController = async (
  request: Request,
  response: Response
) => {
  const paramsSchema = z.object({
    username: z.string(),
  });

  const params = await paramsSchema.parseAsync(request.params);

  const user = await getUserByUsername(params.username);

  return response.json(user);
};
