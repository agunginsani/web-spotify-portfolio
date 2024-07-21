import { test, expect } from "@playwright/test";

test("has correct `h1`", async ({ page, context }) => {
  await context.addCookies([
    {
      name: "credentials",
      domain: "localhost",
      path: "/",
      value:
        "eyJhY2Nlc3NfdG9rZW4iOiJCUUJJc0NUNlJpa25OOFNfcDhWQTg3RWhrbDJ2OUdUcDhGbjd1RmpEQUw1MzBmLWNKbV96UXppODQ5S09ja2dKdF9ybG1PdTdwSVo4em9HbUxJbmVzQVNPRWdnRHJ6dGpva0RiLU1jNDVXaVB1U3ZNdTdmWTZ6MmVxQXkzWU10YTdibTdPX0NCWU84VWlkYU5lZm95S2VFWW9VdG1Mc0tnbVQyXzlMN0gtc013dzJTUTNQanJoUFprak12TVptdjNqbk1Kb2loMzdKbHMwaXhhUWVpWXU0ZWo2WDRCUUEifQ%3D%3D.J88aY4SxJSem16YrSWJTyuxL6DIPzJhZgqM2A5wrIu8",
    },
  ]);

  await page.goto("/artist/1");

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
