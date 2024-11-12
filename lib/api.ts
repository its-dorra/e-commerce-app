import { AppType } from "@/server/main";
import { hc } from "hono/client";
import env from "../server/env";

const { api } = hc<AppType>(env.NEXT_PUBLIC_BASE_URL);

export default api;
