import { z } from "zod";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { updateUsername } from "../../usecases/update-username/update-username.usecase";

export const updateUsernameController = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().patch(
    "/me/username",
    {
      schema: {
        summary: "Update authenticated user username",
        tags: ["Me"],
        body: z.object({
          username: z.string().trim().min(3),
        }),
        response: {
          200: z.object({}),
        },
      },
    },
    async (request, reply) => {
      const updatedUser = await updateUsername({
        id: request.user.sub,
        username: request.body.username,
      });

      return reply.send(updatedUser);
    }
  );
};
