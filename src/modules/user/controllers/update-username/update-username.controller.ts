import { z } from "zod";
import { getUserByUsername } from "../../usecases/get-user-by-username/get-user-by-username.usecase";
import { updateUsername } from "../../usecases/update-username/update-username.usecase";
import { safeController } from "../../../../middlewares/safe-controller";

export const updateUsernameController = safeController(
  async (request, response) => {
    const schema = z.object({
      username: z.string().trim().min(3),
    });

    const params = await schema.parseAsync(request.params);
    const body = await schema.parseAsync(request.body);

    const user = await getUserByUsername(params.username);

    const updatedUser = await updateUsername({
      id: user.id,
      username: body.username,
    });

    return response.json(updatedUser);
  }
);
