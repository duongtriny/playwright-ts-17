import { expect, Page, test } from "@playwright/test";
import { clickButtonByLabel } from "./elements/button.spec";

test(`Verify alert`, async ({ page, context }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/windows');
    let newPageEvent = context.waitForEvent('page');
    await clickButtonByLabel('Open New Tab', page);
    let newPage = await newPageEvent;
    await expect(newPage.getByText(`Welcome to Test With Me`)).toBeVisible();
});