import { expect, Page, test } from "@playwright/test";
import { expectedTableData } from "../../../data/table/table-test-data";

test(`Verify table`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/table');
    await page.waitForTimeout(1000);
    let expectedHeaders = ['Tags', 'Address', 'Age', 'Name'];
    let actualTableData = await getTableDataByLabel('Table', expectedHeaders, page);
    expect(actualTableData.length).toEqual(expectedTableData.length);
    expect(sortJson(actualTableData)).toEqual(expect.arrayContaining(sortJson(expectedTableData)));
    console.log();
});

async function getTableDataByLabel(label: string, expectedHeaders: string[], page: Page) {
    let tableXpath = `(//div[@role='separator' and normalize-space()='${label}']/following::table)[1]`;
    let data = [];
    let isStop;
    let paginationXpath = `(//div[@role='separator' and normalize-space()='${label}']/following::ul[contains(concat(' ', @class, ' '), ' ant-pagination ')])[1]`;
    let paginationLocator = page.locator(paginationXpath);
    do {
        let tableLocator = page.locator(tableXpath);
        let actualHeaders = await tableLocator.locator('th').allTextContents();
        let actualIndexMapping = [];
        for (let i = 0; i < expectedHeaders.length; i++) {
            let actualIndex = actualHeaders.indexOf(expectedHeaders[i]);
            let actualIndexObj = {
                key: expectedHeaders[i],
                actualIndex: actualIndex
            }
            actualIndexMapping.push(actualIndexObj);
        }
        let rows = await tableLocator.locator('tbody tr').all();

        for (let row of rows) {
            let rowDataObj: any = {};
            for (let actualIndexObj of actualIndexMapping) {
                let tdXpath = `//td[${actualIndexObj.actualIndex + 1}]`;
                let tdValue;
                if (actualIndexObj.key == 'Tags') {
                    tdValue = await row.locator(tdXpath).locator('.ant-tag').allTextContents();
                } else {
                    tdValue = await row.locator(tdXpath).textContent();
                }
                rowDataObj[`${actualIndexObj.key}`] = tdValue;
            }
            data.push(rowDataObj);
        }
        let nextButton = paginationLocator.locator("li[title='Next Page']");
        isStop = await nextButton.getAttribute('aria-disabled');
        if (isStop == 'false') {
            await nextButton.click();
        }
    } while (isStop == 'false');
    return data;
}

function sortJson(value: any): any {
    // Array → sort values
    if (Array.isArray(value)) {
        return value
            .map(sortJson)
            .sort((a, b) => {
                return JSON.stringify(a).localeCompare(JSON.stringify(b));
            });
    }

    // Object → sort keys
    if (value !== null && typeof value === "object") {
        const sorted: { [key: string]: any } = {};
        Object.keys(value)
            .sort()
            .forEach(key => {
                sorted[key] = sortJson(value[key]);
            });
        return sorted;
    }

    return value;
}