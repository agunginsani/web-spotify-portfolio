import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from "~/tailwind.css?url";
import { Snackbar, SnackbarProvider } from "./helpers/snackbar";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function App() {
  return (
    <html lang="en" className="bg-black text-white lg:p-3">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <SnackbarProvider>
          <Outlet />
          <Snackbar />
        </SnackbarProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
