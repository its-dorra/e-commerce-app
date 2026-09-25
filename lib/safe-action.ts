import { createSafeActionClient } from "next-safe-action";
import { getSession } from "@/lib/auth";

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    console.error("Action error:", e);
    return e instanceof Error ? e.message : "An unexpected error occurred";
  },
});

export const authActionClient = actionClient.use(async ({ next }) => {
  const session = await getSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return next({ ctx: { user: session.user } });
});

export const adminActionClient = authActionClient.use(async ({ next, ctx }) => {
  if (ctx.user.role !== "admin") {
    throw new Error("Forbidden");
  }
  return next({ ctx });
});
