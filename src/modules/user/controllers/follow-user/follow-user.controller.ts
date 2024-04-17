import { z } from "zod";
import { safeController } from "../../../../middlewares/safe-controller";
import { followUser } from "../../usecases/follow-user/follow-user.usecase";

export const followUserController = safeController(
  async (request, response) => {
    const paramsSchema = z.object({
      username: z.string(),
    });

    const { username } = await paramsSchema.parseAsync(request.params);

    await followUser({
      follower_id: request.userId,
      following_username: username,
    });

    return response.sendStatus(204);
  }
);
