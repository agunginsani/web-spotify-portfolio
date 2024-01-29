import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { credentials } from "~/cookies.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await credentials.parse(cookieHeader)) ?? {};
  if (!cookie.access_token) throw redirect("/login");
  return redirect("/search");
}
