import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { listPosts } from "../../usecases/list-posts/list-posts.usecase";

export const listPostsController = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get("/", {}, async (_, reply) => {
    const posts = await listPosts();

    return reply.send({ posts });
  });
};
