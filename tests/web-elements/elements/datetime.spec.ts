import { expect, Page, test } from "@playwright/test";

test(`Verify datetime`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/date-time');
    await selectTimePickerByLabel('Time Picker', '06', '07', '08', page);
    await expect(page.getByText('Current time: 06:07:08')).toBeVisible();
    let timeBeforeClick = new Date().getTime();
    await page.waitForTimeout(1000);
    await selectTimePickerByLabelForNow('Time Picker', page);
    let timeAfterClick = new Date().getTime();
    let resultLocator = `//div[contains(concat(' ', @class, ' '), ' ant-divider ') and contains(normalize-space(), 'Time Picker')]/following::div[contains(text(), 'Current time: ')][1]`;
    let actualTimeString = await page.locator(resultLocator).locator('.text-rose-500').textContent();
    let currentDateTime = new Date().toLocaleString();
    let currentDate = currentDateTime.split(',')[0];
    let actualDateTime = new Date(`${currentDate}, ${actualTimeString}`).getTime();
    expect(actualDateTime).toBeGreaterThanOrEqual(timeBeforeClick);
    expect(actualDateTime).toBeLessThanOrEqual(timeAfterClick);
});

async function selectTimePickerByLabel(label: string, hours: string, minutes: string, seconds: string, page: Page) {
    let timePickerInputXpath = `(//label[normalize-space()='${label}']//following::div[contains(concat(' ',normalize-space(@class),' '),' ant-picker ')])[1]`;
    await page.locator(timePickerInputXpath).click();
    let hoursXpath = `//ul[@data-type='hour']//li[normalize-space()='${hours}']`;
    let minutesXpath = `//ul[@data-type='minute']//li[normalize-space()='${minutes}']`;
    let secondsXpath = `//ul[@data-type='second']//li[normalize-space()='${seconds}']`;
    await page.locator(hoursXpath).click();
    await page.locator(minutesXpath).click();
    await page.locator(secondsXpath).click();
    let okButtonXpath = `//li[contains(concat(' ',normalize-space(@class),' '),' ant-picker-ok ')]//button[normalize-space()='OK']`;
    await page.locator(okButtonXpath).click();
}

async function selectTimePickerByLabelForNow(label: string, page: Page) {
    let timePickerInputXpath = `(//label[normalize-space()='${label}']//following::div[contains(concat(' ',normalize-space(@class),' '),' ant-picker ')])[1]`;
    await page.locator(timePickerInputXpath).click();
    let nowButtonXpath = "//li[contains(concat(' ',normalize-space(@class),' '),' ant-picker-now ')]//a[normalize-space()='Now']";
    await page.locator(nowButtonXpath).click();
}