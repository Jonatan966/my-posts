import { Request, Response } from "express";
import { updateUser } from "../../usecases/update-user/update-user.usecase";
import { z } from "zod";
import { getUserByUsername } from "../../usecases/get-user-by-username/get-user-by-username.usecase";

export const updateUserController = async (
  request: Request,
  response: Response
) => {
  const paramsSchema = z.object({
    username: z.string(),
  });

  const bodySchema = z.object({
    display_name: z.string().optional(),
    bio: z.string().optional(),
  });

  const params = await paramsSchema.parseAsync(request.params);
  const body = await bodySchema.parseAsync(request.body);

  const oldUser = await getUserByUsername(params.username);

  const updatedUser = await updateUser({
    id: oldUser.id,
    bio: body?.bio,
    display_name: body?.display_name,
  });

  return response.json(updatedUser);
};
