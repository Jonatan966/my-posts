import { FastifyInstance } from "fastify";
import { ZodError } from "zod";

type FastifyErrorHandler = FastifyInstance["errorHandler"];

export const errorHandler: FastifyErrorHandler = (error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      error: {
        message: "Validation error",
        code: "validation_error",
        details: error.flatten().fieldErrors,
      },
    });
  }

  return reply.status(error?.statusCode || 500).send({
    error: {
      message: error?.message || "Unknown error",
      code: error?.name || "unknown",
    },
  });
};
