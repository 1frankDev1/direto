import asyncio
from playwright.async_api import async_playwright
import os

async def verify():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        # Get absolute path to the file
        file_path = "file://" + os.path.abspath("docs/restaurantapp.html")
        page = await browser.new_page()
        await page.goto(file_path)

        # Take screenshot of Light Mode (default)
        await page.screenshot(path="verification/light_mode.png")
        print("Captured light_mode.png")

        # Switch to Dark Mode
        await page.click('text=Temas')
        await page.click('text=Modo Oscuro')
        await asyncio.sleep(0.5)
        await page.screenshot(path="verification/dark_mode.png")
        print("Captured dark_mode.png")

        # Switch to Modo Medio
        await page.click('text=Temas')
        await page.click('text=Modo Medio')
        await asyncio.sleep(0.5)
        await page.screenshot(path="verification/medio_mode.png")
        print("Captured medio_mode.png")

        # Switch to Modo Pastel
        await page.click('text=Temas')
        await page.click('text=Modo Pastel')
        await asyncio.sleep(0.5)
        await page.screenshot(path="verification/pastel_mode.png")
        print("Captured pastel_mode.png")

        # Test Search
        await page.fill('#directorySearch', 'Polanco')
        await page.click('#searchBtn')
        await asyncio.sleep(0.5)
        await page.screenshot(path="verification/search_test.png")
        print("Captured search_test.png")

        # Test Chips
        await page.click('text=Tijuana')
        await asyncio.sleep(0.5)
        await page.screenshot(path="verification/chip_test.png")
        print("Captured chip_test.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify())
