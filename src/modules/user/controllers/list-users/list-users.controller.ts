import { safeController } from "../../../../middlewares/safe-controller";
import { listUsers } from "../../usecases/list-users/list-users.usecase";

export const listUsersController = safeController(async (request, response) => {
  const { users } = await listUsers();

  return response.json({ users });
});
