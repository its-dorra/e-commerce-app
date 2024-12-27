import { AppType } from "@/server/main";
import { hc } from "hono/client";
import env from "../server/env";

const { api } = hc<AppType>(env.NEXT_PUBLIC_BASE_URL, {
  fetch(input, requestInit, Env, executionCtx) {
    const config = {
      ...requestInit,
      next: {
        ...requestInit?.next,
        revalidate: 0,
      },
    } satisfies RequestInit;

    return fetch(input, config);
  },
});

export default api;
