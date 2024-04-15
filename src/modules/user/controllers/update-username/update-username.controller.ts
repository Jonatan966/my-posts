import { z } from "zod";
import { updateUsername } from "../../usecases/update-username/update-username.usecase";
import { safeController } from "../../../../middlewares/safe-controller";

export const updateUsernameController = safeController(
  async (request, response) => {
    const schema = z.object({
      username: z.string().trim().min(3),
    });

    const body = await schema.parseAsync(request.body);

    const updatedUser = await updateUsername({
      id: request.userId,
      username: body.username,
    });

    return response.json(updatedUser);
  }
);
