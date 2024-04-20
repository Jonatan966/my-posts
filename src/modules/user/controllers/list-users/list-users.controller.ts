import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { listUsers } from "../../usecases/list-users/list-users.usecase";
import z from "zod";

export const listUsersController = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    "",
    {
      schema: {
        summary: "List users",
        tags: ["Users"],
        response: {
          200: z.object({
            users: z.array(z.object({})),
          }),
        },
      },
    },
    async (_, reply) => {
      const { users } = await listUsers();

      return reply.send({ users });
    }
  );
};
