import asyncio
from playwright.async_api import async_playwright
import os

async def verify_admin_features():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={'width': 1280, 'height': 1200})
        page = await context.new_page()

        file_path = f"file://{os.getcwd()}/docs/admin.html"
        await page.goto(file_path)
        await page.wait_for_timeout(2000)

        # 1. Verify background expansion by adding many slots
        for _ in range(20):
            await page.click("#addSlotBtn")
            await page.select_option("#toolSelect", "Directorio")
            await page.click("#applyBtn")

        await page.screenshot(path="verification/admin_expanded_background.png", full_page=True)
        print("Background expansion screenshot saved.")

        # 2. Verify drag and drop (visual check in screenshot)
        # We'll drag the first item to the last position
        items = page.locator(".bento-item")
        count = await items.count()
        if count > 1:
            first_item = items.nth(0)
            last_item = items.nth(count - 1)

            box1 = await first_item.bounding_box()
            box2 = await last_item.bounding_box()

            await page.mouse.move(box1["x"] + box1["width"] / 2, box1["y"] + box1["height"] / 2)
            await page.mouse.down()
            await page.mouse.move(box2["x"] + box2["width"] / 2, box2["y"] + box2["height"] / 2)
            await page.mouse.up()

            await page.wait_for_timeout(500)
            await page.screenshot(path="verification/admin_after_drag.png")
            print("Drag and drop screenshot saved.")

        await browser.close()

if __name__ == "__main__":
    os.makedirs("verification", exist_ok=True)
    asyncio.run(verify_admin_features())
