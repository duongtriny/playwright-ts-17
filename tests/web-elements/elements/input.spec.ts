import { expect, Page, test } from "@playwright/test";

test(`Verify check the checkbox`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/input');
    await inputTextboxByLabel('Normal Input', 'Apple', page);
    await expect(page.getByText(`Value: Apple`)).toBeVisible();

    await inputTextboxByLabel('Input Number', '100', page);
    await expect(page.getByText(`Value: 100`)).toBeVisible();

    await inputTextareaByLabel('Text Area', 'Test With Me', page);
    await expect(page.getByText(`Value: Test With Me`)).toBeVisible();

    await inputTextboxByLabel('Password Box', '1234567890', page);
    await expect(page.getByText(`Value: 1234567890`)).toBeVisible();
});

async function inputTextboxByLabel(label: string, input: string, page: Page) {
    let xpath = `(//label[normalize-space()='${label}']/following::input)[1]`;
    await inputTextboxByXpath(xpath, input, page);
}

async function inputTextareaByLabel(label: string, input: string, page: Page) {
    let xpath = `(//label[normalize-space()='${label}']/following::textarea)[1]`;
    await inputTextboxByXpath(xpath, input, page);
}

async function inputTextboxByXpath(xpath: string, input: string, page: Page) {
    let inputLocator = page.locator(xpath);
    await inputLocator.click();
    await inputLocator.clear();
    await inputLocator.fill(input, { force: true });
}