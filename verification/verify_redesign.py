import asyncio
import os
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Get absolute path for the local file
        path = os.path.abspath("docs/restaurantapp.html")
        url = f"file://{path}"

        await page.goto(url)
        await page.wait_for_timeout(2000) # Wait for animations

        # Themes to test
        themes = ["light", "dark", "medio", "pastel"]

        if not os.path.exists("verification"):
            os.makedirs("verification")

        for theme in themes:
            print(f"Verifying theme: {theme}")
            # Click the theme button
            await page.click(f'[data-theme-value="{theme}"]')
            await page.wait_for_timeout(1000) # Wait for transition

            # Take screenshot
            await page.screenshot(path=f"verification/theme_{theme}.png", full_page=True)

            # Check search
            if theme == "light":
                await page.fill("#directorySearch", "Tijuana")
                await page.wait_for_timeout(1000)
                await page.screenshot(path="verification/search_tijuana.png")
                await page.fill("#directorySearch", "") # Clear

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
