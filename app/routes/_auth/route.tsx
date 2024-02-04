import { Outlet } from "@remix-run/react";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { credentials } from "~/helpers/cookies.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await credentials.parse(cookieHeader)) ?? {};
  if (!cookie.access_token) throw redirect("/login");
  return null;
}

export default function Route() {
  return <Outlet />;
}
