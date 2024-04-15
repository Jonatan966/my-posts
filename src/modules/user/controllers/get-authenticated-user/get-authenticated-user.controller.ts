import { safeController } from "../../../../middlewares/safe-controller";
import { getUserById } from "../../usecases/get-user-by-id/get-user-by-id.usecase";

export const getAuthenticatedUser = safeController(
  async (request, response) => {
    const user = await getUserById(request.userId);

    return response.json({
      ...user,
      password: undefined,
    });
  }
);
