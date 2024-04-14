import { z } from "zod";
import jwt from "jsonwebtoken";
import { safeController } from "../../../../middlewares/safe-controller";
import { authenticateUser } from "../../usecases/authenticate-user/authenticate-user.usecase";
import { environment } from "../../../../utils/env";

export const authenticateUserController = safeController(
  async (request, response) => {
    const bodySchema = z.object({
      username: z.string(),
      password: z.string(),
    });

    const { username, password } = await bodySchema.parseAsync(request.body);

    const user = await authenticateUser({
      username,
      password,
    });

    const token = jwt.sign({}, environment.secret, {
      subject: user.id,
      expiresIn: "30d",
    });

    return response.json({
      token,
    });
  }
);
