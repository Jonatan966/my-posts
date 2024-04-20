import { z } from "zod";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { updateUser } from "../../usecases/update-user/update-user.usecase";

export const updateUserController = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/me",
    {
      schema: {
        body: z.object({
          display_name: z.string().optional(),
          bio: z.string().optional(),
        }),
      },
    },
    async (request, reply) => {
      const updatedUser = await updateUser({
        id: request.user.sub,
        bio: request.body?.bio,
        display_name: request.body?.display_name,
      });

      return reply.send(updatedUser);
    }
  );
};
