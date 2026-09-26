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

test(`Verify date`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/date-time');
    await selectDatePickerByLabel('Date Picker', '9', 'May', '2031', page);
    await expect(page.getByText('Current date: 2031-05-09')).toBeVisible();
});

async function selectDatePickerByLabel(label: string, dd: string, mm: string, yyyy: string, page: Page) {
    let datePickerXpath = `//label[normalize-space()='${label}']//following::div[contains(concat(' ', @class, ' '), ' ant-picker ')][1]`;
    await page.locator(datePickerXpath).click();
    //Select year
    let buttonChooseYearXpath = `//button[@aria-label='Choose a year']`;
    await page.locator(buttonChooseYearXpath).click();
    let buttonChooseDecadeXpath = `//button[@aria-label='Choose a decade']`;
    let decadeText = await page.locator(buttonChooseDecadeXpath).textContent();
    let [minYearText, maxYearText] = decadeText?.split('-') || [];
    let minYear = Number.parseInt(minYearText);
    let maxYear = Number.parseInt(maxYearText);
    let year = Number.parseInt(yyyy);
    let distance;
    let decadeMoveButtonXpath;
    if (year >= maxYear) {
        decadeMoveButtonXpath = `//button[@aria-label='Next year']`;
        distance = year - maxYear;
    } else {
        decadeMoveButtonXpath = `//button[@aria-label='Last year']`
        distance = minYear - year;
    }
    let clickCounts = Math.ceil(distance / (maxYear - minYear + 1));
    for (let i = 0; i < clickCounts; i++) {
        await page.locator(decadeMoveButtonXpath).click();
    }
    let yearXpath = `//td[contains(concat(' ', @class, ' '), ' ant-picker-cell-in-view ') and normalize-space()='${yyyy}']`;
    await page.locator(yearXpath).click();
    //Select month
    let monthXpath = `//td[contains(concat(' ', @class, ' '), ' ant-picker-cell-in-view ') and normalize-space()='${mm}']`;
    await page.locator(monthXpath).click();
    //Select day
    let dayXpath = `//td[contains(concat(' ', @class, ' '), ' ant-picker-cell-in-view ') and normalize-space()='${dd}']`;
    await page.locator(dayXpath).click();
}