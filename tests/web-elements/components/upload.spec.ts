import { expect, Page, test } from "@playwright/test";
import path from "path";

test(`Verify upload`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/upload');
    await uploadFileByLabel('Upload File', 'data/images/iphone-18-pro-max.jpg', page);
    await expect(page.getByText('iphone-18-pro-max.jpg')).toBeVisible();
});

async function uploadFileByLabel(label: string, filePath: string, page: Page) {
    let xpath = `(//label[normalize-space()='${label}']/following::input[@type='file'])[1]`;
    let absoluteFilePath = path.join(process.cwd(), filePath);
    console.log(process.cwd());
    await page.locator(xpath).setInputFiles(absoluteFilePath);
}