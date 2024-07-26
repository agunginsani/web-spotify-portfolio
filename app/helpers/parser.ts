import { z } from "zod";

export function stringToBoolean(data: unknown) {
  return z
    .literal("false")
    .or(z.literal("true"))
    .transform((value) => value === "true")
    .parse(data);
}
