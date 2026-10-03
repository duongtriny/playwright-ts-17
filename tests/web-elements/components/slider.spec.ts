import { expect, Page, test } from "@playwright/test";

test(`Verify select slider`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/slider');
    await selectSliderValueByLabel('Volume', 100, page);
    await expect(page.getByText('Current Value: 100').first()).toBeVisible();
});

async function selectSliderValueByLabel(label: string, value: number, page: Page) {
    let sliderRailXpath = `(//label[normalize-space()='${label}']/following::div[contains(concat(' ',@class ,' '),' ant-slider-rail ')])[1]`;
    let sliderRailLocator = page.locator(sliderRailXpath);
    let sliderRailBox = await sliderRailLocator.boundingBox();
    let x = sliderRailBox?.x ?? 0;
    let y = sliderRailBox?.y ?? 0;
    let width = sliderRailBox?.width ?? 0;
    let height = sliderRailBox?.height ?? 0;
    let beClickedX = x + width / 100 * value;
    let beClickedY = y + height / 2;
    if (value == 100) {
        beClickedX -= 3;
    }
    await page.mouse.click(beClickedX, beClickedY);
}
