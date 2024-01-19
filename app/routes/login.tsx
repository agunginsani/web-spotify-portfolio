import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { z } from "zod";
import { credentials } from "~/cookies.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await credentials.parse(cookieHeader)) || {};
  const token = await getToken();
  cookie.access_token = token;
  return redirect("/", {
    headers: {
      "Set-Cookie": await credentials.serialize(cookie),
    },
  });
}

async function getToken() {
  const clientId = z.string().parse(process.env.SPOTIFY_API_CLIENT_ID);
  const clientSecret = z.string().parse(process.env.SPOTIFY_API_CLIENT_SECRET);
  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
  });
  const data = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  const json = z.object({ access_token: z.string() }).parse(await data.json());
  return json.access_token;
}
