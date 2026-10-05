import { expect, Page, test } from "@playwright/test";

test(`Verify select slider`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/transfer');
    let inputs = ['Apple', 'Kiwi'];
    await transferByLabel('Transfer', inputs, 'Source', page);
    // get current Source's items
    let currentSourceItems = await getPanelItemsByLabel('Transfer', 'Source', page);
    expect(currentSourceItems).not.toEqual(expect.arrayContaining(inputs));
    // get current Target's items
    let currentTargetItems = await getPanelItemsByLabel('Transfer', 'Target', page);
    expect(currentTargetItems).toEqual(expect.arrayContaining(inputs));
    await page.waitForTimeout(3000);
    await transferByLabel('Transfer', inputs, 'Target', page);
    // get current Source's items
    currentSourceItems = await getPanelItemsByLabel('Transfer', 'Source', page);
    expect(currentSourceItems).toEqual(expect.arrayContaining(inputs));
    // get current Target's items
    currentTargetItems = await getPanelItemsByLabel('Transfer', 'Target', page);
    expect(currentTargetItems).not.toEqual(expect.arrayContaining(inputs));
    await page.waitForTimeout(3000);
});

async function transferByLabel(label: string, items: string[], source: 'Source' | 'Target', page: Page) {
    let transferXpath = `(//label[normalize-space()='${label}']/following::div[contains(concat(' ',@class,' '),' ant-transfer ')])[1]`;
    let transferLocator = page.locator(transferXpath);
    let sourcePanelXpath = `//div[contains(concat(' ',@class,' '),' ant-transfer-section ') and .//span[contains(concat(' ',@class,' '),' ant-transfer-list-header-title ') and normalize-space()='${source}']]`;
    let sourcePanelLocator = transferLocator.locator(sourcePanelXpath);
    for (let item of items) {
        let itemXpath = `//li[normalize-space()='${item}']`;
        await sourcePanelLocator.locator(itemXpath).click();
    }
    let direction = source == 'Source' ? 'right' : 'left';
    let moveButtonXpath = `//div[contains(concat(' ', @class, ' '), ' ant-transfer-actions ')]//button[.//span[@aria-label='${direction}']]`;
    await transferLocator.locator(moveButtonXpath).click();
}

async function getPanelItemsByLabel(label: string, panel: string, page: Page) {
    let transferXpath = `(//label[normalize-space()='${label}']/following::div[contains(concat(' ',@class,' '),' ant-transfer ')])[1]`;
    let transferLocator = page.locator(transferXpath);
    let panelXpath = `//div[contains(concat(' ',@class,' '),' ant-transfer-section ') and .//span[contains(concat(' ',@class,' '),' ant-transfer-list-header-title ') and normalize-space()='${panel}']]`;
    let panelLocator = transferLocator.locator(panelXpath);
    let items = await panelLocator.locator('.ant-transfer-list-content-item').allTextContents();
    return items;
}