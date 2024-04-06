import { z } from "zod";
import { getUserByUsername } from "../../usecases/get-user-by-username/get-user-by-username.usecase";
import { safeController } from "../../../../middlewares/safe-controller";

export const getUserByUsernameController = safeController(
  async (request, response) => {
    const paramsSchema = z.object({
      username: z.string(),
    });

    const params = await paramsSchema.parseAsync(request.params);

    const user = await getUserByUsername(params.username);

    return response.json(user);
  }
);
