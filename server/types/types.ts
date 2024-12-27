import { StatusCode } from "hono/utils/http-status";

export class ErrorWithStatus extends Error {
  constructor(
    message: string,
    public status: StatusCode,
  ) {
    super(message);
  }
}
