import { AppType } from "@/app/api/[[...route]]/route";
import { hc } from "hono/client";
import env from "./env";

const { api } = hc<AppType>(env.NEXT_PUBLIC_BASE_URL);

export default api;
