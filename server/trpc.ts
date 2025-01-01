import { initTRPC } from "@trpc/server";
import { Context } from "./context";
import { ZodError } from "zod";
import superjson from "superjson";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const router = t.router;
export const procedure = t.procedure;
export const middleware = t.middleware;
export const createCallerFactory = t.createCallerFactory;
