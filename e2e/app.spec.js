const { test, expect } = require("@playwright/test");

test.describe("Главная страница", () => {
  test("отображает приветствие", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("welcome")).toHaveText(/Сервер работает/);
  });

  test("показывает ссылку на endpoint версии", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "/api/version" })).toHaveAttribute("href", "/api/version");
  });
});
