import { createMiddleware } from "hono/factory";
import { User } from "lucia";
import { validateRequest } from "../lucia/utils";
import { StatusCodes } from "http-status-codes";

type Env = {
  Variables: {
    user: User;
  };
};

export const isAuth = createMiddleware<Env>(async (c, next) => {
  const { user } = await validateRequest();

  console.log({ user });

  if (!user) {
    c.status(StatusCodes.UNAUTHORIZED);
    throw new Error("You are not authorized");
  }

  c.set("user", user);

  await next();
});

export const isAdmin = createMiddleware<Env>(async (c, next) => {
  const { user } = c.var;
  if (user.role !== "admin") {
    c.status(StatusCodes.UNAUTHORIZED);
    throw new Error("You are not authorized");
  }

  await next();
});
