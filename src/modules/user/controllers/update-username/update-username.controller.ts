import { Request, Response } from "express";
import { z } from "zod";
import { getUserByUsername } from "../../usecases/get-user-by-username/get-user-by-username.usecase";
import { updateUsername } from "../../usecases/update-username/update-username.usecase";

export const updateUsernameController = async (
  request: Request,
  response: Response
) => {
  const schema = z.object({
    username: z.string(),
  });

  const params = await schema.parseAsync(request.params);
  const body = await schema.parseAsync(request.body);

  const user = await getUserByUsername(params.username);

  const updatedUser = await updateUsername({
    id: user.id,
    username: body.username,
  });

  return response.json(updatedUser);
};