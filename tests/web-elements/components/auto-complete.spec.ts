import { expect, Page, test } from "@playwright/test";

test(`Verify select the auto-complete`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/auto-complete');
    await selectAutoCompleteByLabel('AutoComplete', 'Downing Street', page);
    await expect(page.getByText('Value: Downing Street was selected!').first()).toBeVisible();
});

async function selectAutoCompleteByLabel(label: string, option: string, page: Page) {
    let autoCompleteTextboxXpath = `(//label[normalize-space()='${label}']/following::input)[1]`;
    let autoCompleteTextboxLocator = page.locator(autoCompleteTextboxXpath);
    await autoCompleteTextboxLocator.click();
    await autoCompleteTextboxLocator.clear();
    await autoCompleteTextboxLocator.fill(option);
    let optionXpath = `//div[contains(concat(' ',@class,' '),' ant-select-item-option ') and normalize-space()='${option}']`;
    await page.locator(optionXpath).click();
}