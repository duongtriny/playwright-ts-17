import { expect, Page, test } from "@playwright/test";
import { clickButtonByLabel } from "./elements/button.spec";

test(`Verify alert`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/alerts');
    page.on('dialog', async (dialog) => {
        await dialog.dismiss();
    });
    await clickButtonByLabel('Show Confirm', page);

    await expect(page.getByText(`Selected value: Cancel`)).toBeVisible();
});