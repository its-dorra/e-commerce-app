import { validateRequest } from "../lucia/utils";
import { middleware, procedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const isAuth = middleware(({ ctx, next }) => {
  const { user } = ctx;

  if (!user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authorized",
    });
  }

  return next({
    ctx: {
      user,
    },
  });
});

export const authenticatedProcedure = procedure.use(isAuth);

export const isAdmin = middleware(async ({ ctx, next }) => {
  if (ctx.user?.role !== "admin") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "You are not authorized",
    });
  }

  return next();
});

export const adminProcedure = authenticatedProcedure.use(isAdmin);
