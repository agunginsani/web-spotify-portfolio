import { test, expect } from "@playwright/test";

test("has correct `h1`", async ({ page, context }) => {
  await context.addCookies([
    {
      name: "credentials",
      url: "http://127.0.0.1:3000",
      value:
        "eyJhY2Nlc3NfdG9rZW4iOiJCUUEwVXNhTVdUVFlDMEFHWmMyaTAwVjVNNkNud2h0T3FPaXdyNlIwcU1JRHJJRDVMbEFNUGRXTmdBWmllNW5fVWtoSGFqUWY4a1BjdmxSUUl1YkJTcTJ0MFBwUHBsay1pTFgxVEE5Y3ZIcm83b1JfMm9DZ3NtVXZMcFdSYVZTQzc3TkpGWktORWxPVlE4VFlYN3ZTSFZPQTJxNGRNX21naS1Wd2RSbzU2WldobTVHVVpfOFFVRGU5RTM4MHhheGtOWVEyeHdPcmJpQlU4cWZJaEFUUDVYX1RhUEhreWcifQ%3D%3D.YGF037Ily1xQPGvxDr7XfYePk2MZkJaUaUazcqbcF3A",
    },
  ]);

  await page.goto("/artist/1");

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
