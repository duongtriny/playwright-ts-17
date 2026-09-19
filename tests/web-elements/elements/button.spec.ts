import { expect, Page, test } from "@playwright/test";

let buttons = ['Div button', 'Origin button', 'Input button', 'Default', 'Primary', 'Dashed', 'Text', 'Link', 'Icon button'];
for (let button of buttons) {
    test(`Verify click button: ${button}`, async ({ page }) => {
        await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/button');
        await clickButtonByLabel2(button, page);
        await expect(page.getByText(`Button ${button} was clicked`)).toBeVisible();
    });
}

async function clickButtonByLabel(label: string, page: Page) {
    // let xpath = `//*[(@role='button' or self::button or self::input) and (normalize-space()='${label}' or @value='${label}')]`;
    let typeOne = `//div[@role='button' and normalize-space()='${label}']`;
    let typeTwo = `//button[normalize-space()='${label}']`;
    let typeThree = `//input[@value='${label}']`;
    let buttonXpath = `${typeOne} | ${typeTwo} | ${typeThree}`;
    await page.locator(buttonXpath).click();
}

async function clickButtonByLabel2(label: string, page: Page) {
    await page.getByRole('button', {
        name: label
    }).click();
}