import { expect, test } from "@playwright/test";

test("can search artists", async ({ page }) => {
  await page.goto("/login?code=TEST");

  await page.goto("/");

  const searchbox = page.getByRole("searchbox", {
    name: "What do you want to listen to?",
  });

  const artistsList = page.getByRole("list", { name: "Artists" });

  const albumsList = page.getByRole("list", { name: "Albums" });

  await expect(searchbox).toBeVisible();

  await expect(artistsList).not.toBeVisible();

  await expect(albumsList).not.toBeVisible();

  const artistsLink = page.getByRole("link", { name: "Artists" });

  const albumsLink = page.getByRole("link", { name: "Albums" });

  await expect(artistsLink).not.toBeVisible();

  await expect(albumsLink).not.toBeVisible();

  await searchbox.fill("a");

  await expect(artistsLink).toBeVisible();

  await expect(artistsLink).toHaveAttribute("aria-current", "page");

  await expect(albumsLink).toBeVisible();

  await expect(albumsLink).not.toHaveAttribute("aria-current", "page");

  await expect(artistsList).toBeVisible();

  await expect(albumsList).not.toBeVisible();

  expect(await artistsList.getByRole("listitem").all()).toHaveLength(50);
});

test("can search albums", async ({ page }) => {
  await page.goto("/login?code=TEST");

  await page.goto("/");

  const searchbox = page.getByRole("searchbox", {
    name: "What do you want to listen to?",
  });

  const artistsList = page.getByRole("list", { name: "Artists" });

  const albumsList = page.getByRole("list", { name: "Albums" });

  await expect(searchbox).toBeVisible();

  await expect(artistsList).not.toBeVisible();

  await expect(albumsList).not.toBeVisible();

  const artistsLink = page.getByRole("link", { name: "Artists" });

  const albumsLink = page.getByRole("link", { name: "Albums" });

  await expect(artistsLink).not.toBeVisible();

  await expect(albumsLink).not.toBeVisible();

  await searchbox.fill("a");

  await expect(artistsLink).toBeVisible();

  await expect(artistsLink).toHaveAttribute("aria-current", "page");

  await expect(albumsLink).toBeVisible();

  await expect(albumsLink).not.toHaveAttribute("aria-current", "page");

  await expect(artistsList).toBeVisible();

  await expect(albumsList).not.toBeVisible();

  expect(await artistsList.getByRole("listitem").all()).toHaveLength(50);

  await albumsLink.click();

  await expect(albumsLink).not.toHaveAttribute("aria-current", "page");

  await expect(albumsLink).toHaveAttribute("aria-current", "page");

  await expect(artistsList).not.toBeVisible();

  await expect(albumsList).toBeVisible();

  expect(await albumsList.getByRole("listitem").all()).toHaveLength(50);
});
