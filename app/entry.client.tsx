/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { stringToBoolean } from "~/helpers/parser";

async function prepare() {
  const mockedApi = stringToBoolean(import.meta.env.VITE_MOCKED_API);

  if (mockedApi) {
    const { worker } = await import("~/mocks/browser");
    return worker.start();
  }

  return;
}

prepare().then(() => {
  return startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <RemixBrowser />
      </StrictMode>,
    );
  });
});
