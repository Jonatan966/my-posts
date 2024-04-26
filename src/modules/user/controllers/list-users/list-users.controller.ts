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
          page_token: z
            .string()
            .cuid2()
            .optional()
            .describe("Necessary to navigate between pages"),
          page_size: z
            .number()
            .min(1)
            .max(20)
            .optional()
            .describe("Integer from `1` to `20`"),
        }),
      },
    },
    async (request, reply) => {
      const { query, page_token, page_size } = request.query;

      const { users } = await listUsers({
        querySearch: query,
        page_token,
        page_size,
      });

      return reply.send({ users });
    }
  );
};
