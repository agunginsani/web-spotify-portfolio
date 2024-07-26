import { expect, test } from "@playwright/test";

test("has correct `h1`", async ({ page }) => {
  await page.goto("/login?code=TEST");

  await page.goto("/artist/1");

  await expect(
    page.getByRole("heading", { level: 1, name: "Test" }),
  ).toBeVisible();
});
