import { createCookie } from "@remix-run/node"; // or cloudflare/deno

export const credentials = createCookie("credentials", {
  maxAge: 604_800,
  secrets: ["WnN7J6jNdY"],
  httpOnly: true,
  secure: true,
});
