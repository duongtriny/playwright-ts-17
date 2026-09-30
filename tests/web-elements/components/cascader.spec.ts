import { expect, Page, test } from "@playwright/test";

test(`Verify cascader`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/cascader');
    await selectCascaderItemByLabel('Cascader', ['Test', 'With', 'You'], page);
    await expect(page.getByText("Current value: Test, With, You")).toBeVisible();
});

async function selectCascaderItemByLabel(label: string, optionLinks: string[], page: Page) {
    let cascaderXpath = `(//label[normalize-space()='${label}']/ following::input[@role='combobox'])[1]`;
    await page.locator(cascaderXpath).click();
    for (let i = 0; i < optionLinks.length; i++) {
        let optionXpath = `//ul[${i + 1}]//li[@role='menuitemcheckbox' and normalize-space()='${optionLinks[i]}']`;
        await page.locator(optionXpath).click();
    }
}