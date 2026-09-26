import { expect, Page, test } from "@playwright/test";

test(`Verify select the radio button`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/radio');
    await selectRadioButtonByLabel('Default Radio Group', 'Orange', page);
    await expect(page.getByText('Value: Orange').first()).toBeVisible();
});

async function selectRadioButtonByLabel(label: string, option: string, page: Page) {
    let xpath = `(//label[normalize-space()='${label}']/following::div[@role='radiogroup']//label[normalize-space()='${option}'])[1]`;
    await page.locator(xpath).click();
}