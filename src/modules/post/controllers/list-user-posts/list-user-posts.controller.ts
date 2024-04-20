import { z } from "zod";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { getUserByUsername } from "../../../user/usecases/get-user-by-username/get-user-by-username.usecase";
import { listPosts } from "../../usecases/list-posts/list-posts.usecase";

export const listUserPostsController = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/:username/posts",
    {
      schema: {
        summary: "List user posts",
        tags: ["Users"],
        security: [{ bearer: [] }],
        params: z.object({
          username: z.string(),
        }),
        response: {
          200: z.object({
            posts: z.array(z.object({})),
          }),
        },
      },
    },
    async (request, reply) => {
      const user = await getUserByUsername(request.params.username);

      const posts = await listPosts({
        author_id: user.id,
      });

      return reply.send({ posts });
    }
  );
};
