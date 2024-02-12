import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { z } from "zod";
import { credentials } from "~/helpers/cookies.server";

const redirectUri =
  process.env.NODE_ENV === "production"
    ? "https://web-spotify-portfolio.fly.dev/login"
    : "http://localhost:3000/login";

const clientId = z.string().parse(process.env.SPOTIFY_API_CLIENT_ID);

const clientSecret = z.string().parse(process.env.SPOTIFY_API_CLIENT_SECRET);

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await credentials.parse(cookieHeader)) || {};
  const referer = z
    .string()
    .url()
    .catch("/")
    .parse(request.headers.get("Referer"));

  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (code !== null) {
    const token = await getAccessToken(code);
    cookie.access_token = token;
    return redirect(referer, {
      headers: {
        "Set-Cookie": await credentials.serialize(cookie),
      },
    });
  }

  const searchParams = new URLSearchParams();
  const scope = [
    "user-read-private",
    "user-read-email",
    "user-follow-read",
    "user-follow-modify",
  ].join(" ");
  searchParams.set("response_type", "code");
  searchParams.set("client_id", clientId);
  searchParams.set("scope", scope);
  searchParams.set("redirect_uri", redirectUri);
  return redirect("https://accounts.spotify.com/authorize?" + searchParams);
}

async function getAccessToken(code: string) {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
  });
  const authorization = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64",
  );
  const data = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${authorization}`,
    },
    body: body.toString(),
  });
  const json = z.object({ access_token: z.string() }).parse(await data.json());
  return json.access_token;
}
