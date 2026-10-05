import { expect, Page, test } from "@playwright/test";

test(`Verify tree select`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/tree-select');
    await selectItemInTreeSelectByLabel('Tree Select', ['Light', 'Cedar'], page);
    await expect(page.getByText('Current value: cedar')).toBeVisible();
    await selectItemInTreeSelectByLabel('Tree Select', ['Light'], page);
    await expect(page.getByText('Current value: light')).toBeVisible();
});

async function selectItemInTreeSelectByLabel(label: string, inputs: string[], page: Page) {
    let treeSelectXpath = `(//label[normalize-space()='${label}']/following::input[@role='combobox'])[1]`;
    await page.locator(treeSelectXpath).click();
    for (let i = 0; i < inputs.length; i++) {
        let treeItemXpath = `//div[@role='treeitem' and normalize-space()='${inputs[i]}']`;
        let treeItemLocator = page.locator(treeItemXpath);
        if (i < inputs.length - 1) {
            let ariaExpanded = await treeItemLocator.getAttribute('aria-expanded');
            if (ariaExpanded != 'true') {
                await treeItemLocator.locator('.ant-select-tree-switcher').click();
            }
        } else {
            await treeItemLocator.locator('.ant-select-tree-node-content-wrapper').click();
        }
    }
}