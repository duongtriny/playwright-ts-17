import { expect, test } from "@playwright/test";

test(`Verify alert`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/shadow-dom');
    await page.getByRole('textbox', { name: 'Name:' }).fill('Test With Me');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText(`What you just type: Test With Me`)).toBeVisible();
});