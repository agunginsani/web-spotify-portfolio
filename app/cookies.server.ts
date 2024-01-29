import { createCookie } from "@remix-run/node"; // or cloudflare/deno
import { z } from "zod";

const secret = z.string().parse(process.env.COOKIE_CREDENTIALS_SECRET);

export const credentials = createCookie("credentials", {
  maxAge: 604_800,
  secrets: [secret],
  httpOnly: true,
  secure: true,
});
