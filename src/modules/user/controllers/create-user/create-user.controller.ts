import { createUser } from "../../usecases/create-user/create-user.usecase";
import { z } from "zod";
import { safeController } from "../../../../middlewares/safe-controller";

export const createUserController = safeController(
  async (request, response) => {
    const userSchema = z.object({
      display_name: z.string(),
      username: z.string().trim().min(3),
      password: z.string().trim().min(6),
      bio: z.string().optional(),
    });

    const userPayload = await userSchema.parseAsync(request.body);

    const createdUser = await createUser(userPayload);

    return response.status(201).json({
      ...createdUser,
      password: undefined,
    });
  }
);
