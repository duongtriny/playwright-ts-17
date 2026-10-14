import { expect, Page, test } from "@playwright/test";

test(`Verify alert`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/frames');
    let iframeXpath = `//iframe[@title='Example Frame']`;
    let iframe = page.locator(iframeXpath).contentFrame();
    await iframe.getByText('UI Automation Java/JS').click();
    await expect(iframe.getByText(`Nâng Tầm Kỹ Năng, Trở Thành Chuyên Gia Kiểm Thử Tự Động`)).toBeVisible();
});