import { credentials } from "~/cookies.server";

export async function client(
  request: Request,
  input: Parameters<typeof fetch>[0],
  init?: Parameters<typeof fetch>[1],
): Promise<Response> {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await credentials.parse(cookieHeader)) ?? {};
  const { headers = {}, ...restInit } = init ?? {};
  const response = await fetch(input, {
    headers: {
      Authorization: `Bearer ${cookie.access_token}`,
      ...headers,
    },
    ...restInit,
  });

  return response;
}
