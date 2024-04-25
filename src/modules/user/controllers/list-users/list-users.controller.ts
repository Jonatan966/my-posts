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
        security: [{ bearer: [] }],
        querystring: z.object({
          query: z.string().trim().min(1),
        }),
      },
    },
    async (request, reply) => {
      const { query } = request.query;

      const { users } = await listUsers({
        querySearch: query,
      });

      return reply.send({ users });
    }
  );
};
