const { test, expect } = require('@playwright/test');

test('start the app in logged out state', async ({ page }) => {
  await page.goto('localhost:8000');
  const title = page.locator('.title');
  await expect(title).toHaveText('Faça o seu login');
});
