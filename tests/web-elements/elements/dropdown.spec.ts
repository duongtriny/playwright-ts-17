import { expect, Page, test } from "@playwright/test";

test(`Verify select the dropdown`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/dropdown');
    await selectDropdownOptionByLabel('Dropdown Button', '2nd menu item', page);
    await expect(page.getByText('Value: 2nd menu item').first()).toBeVisible();
});

async function selectDropdownOptionByLabel(label: string, option: string, page: Page) {
    let dropdownButtonXpath = `(//label[normalize-space()='${label}']/following::button[@aria-label='Dropdown options'])[1]`;
    await page.locator(dropdownButtonXpath).hover();
    let dropdownOptionXpath = `//li[@role='menuitem' and normalize-space()='${option}']`;
    await page.locator(dropdownOptionXpath).click();
}