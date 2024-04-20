import { z } from "zod";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { createUser } from "../../usecases/create-user/create-user.usecase";

export const createUserController = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/",
    {
      schema: {
        body: z.object({
          display_name: z.string(),
          username: z.string().trim().min(3),
          password: z.string().trim().min(6),
          bio: z.string().optional(),
        }),
      },
    },
    async (request, reply) => {
      const createdUser = await createUser(request.body);

      return reply.status(201).send({
        ...createdUser,
        password: undefined,
      });
    }
  );
};
