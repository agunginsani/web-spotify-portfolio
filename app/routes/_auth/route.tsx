import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { credentials } from "~/helpers/cookies.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await credentials.parse(cookieHeader)) ?? {};
  if (!cookie.access_token) throw redirect("/login");
  return null;
}

export default function Route() {
  return (
    <div className="mx-auto h-svh w-full max-w-screen-md overflow-auto bg-black lg:h-[calc(100svh_-_theme(spacing.6))] lg:rounded-lg lg:bg-slate-900">
      <Outlet />
    </div>
  );
}
