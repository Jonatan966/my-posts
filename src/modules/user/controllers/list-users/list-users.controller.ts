import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { listUsers } from "../../usecases/list-users/list-users.usecase";

export const listUsersController = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get("/", {}, async (_, reply) => {
    const { users } = await listUsers();

    return reply.send({ users });
  });
};
