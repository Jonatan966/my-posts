import { updateUser } from "../../usecases/update-user/update-user.usecase";
import { z } from "zod";
import { safeController } from "../../../../middlewares/safe-controller";

export const updateUserController = safeController(
  async (request, response) => {
    const bodySchema = z.object({
      display_name: z.string().optional(),
      bio: z.string().optional(),
    });

    const body = await bodySchema.parseAsync(request.body);

    const updatedUser = await updateUser({
      id: request.userId,
      bio: body?.bio,
      display_name: body?.display_name,
    });

    return response.json(updatedUser);
  }
);
