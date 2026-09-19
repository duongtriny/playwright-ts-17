import { expect, Page, test } from "@playwright/test";

test(`Verify check the checkbox`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/checkbox');
    // await checkCheckboxByLabel('Pear', page);
    await checkCheckboxByLabel('Apple', 'uncheck', page);
    await expect(page.getByText(`Selected values: Apple`)).not.toBeVisible();
    // await expect(page.getByText(`Selected values: Apple Pear`)).toBeVisible();
});

async function checkCheckboxByLabel(label: string, action: 'check' | 'uncheck', page: Page) {
    let xpath = `(//span[normalize-space()='${label}']//preceding::span//input[@type='checkbox'])[last()]`;
    //check if checked
    let checkboxLocator = page.locator(xpath);
    let isCheck = await checkboxLocator.evaluate((node: HTMLInputElement) => node.checked);
    if ((!isCheck && action == 'check') || (isCheck && action == 'uncheck')) {
        await checkboxLocator.click();
    }
}