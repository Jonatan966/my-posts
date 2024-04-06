import { updateUser } from "../../usecases/update-user/update-user.usecase";
import { z } from "zod";
import { getUserByUsername } from "../../usecases/get-user-by-username/get-user-by-username.usecase";
import { appErrorHandler } from "../../../../middlewares/app-error-handler";

export const updateUserController = appErrorHandler(
  async (request, response) => {
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
  }
);
