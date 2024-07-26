import { expect, test } from "@playwright/test";

test("can search artist", async ({ page }) => {
  await page.goto("/login?code=TEST");

  await page.goto("/");

  const searchbox = page.getByRole("searchbox", {
    name: "What do you want to listen to?",
  });

  const list = page.getByRole("list", { name: "Artists" });

  await expect(searchbox).toBeVisible();

  await expect(list).not.toBeVisible();

  await searchbox.fill("a");

  await expect(page.getByRole("link", { name: "Artists" })).toBeVisible();

  await expect(page.getByRole("link", { name: "Albums" })).toBeVisible();

  await expect(list).toBeVisible();

  expect(await list.getByRole("listitem").all()).toHaveLength(50);
});
