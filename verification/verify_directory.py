import os
from playwright.sync_api import sync_playwright, expect

def verify_directory():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        page.on("console", lambda msg: print(f"BROWSER CONSOLE: {msg.text}"))
        page.on("pageerror", lambda exc: print(f"BROWSER ERROR: {exc}"))

        try:
            page.goto("http://localhost:8000/restaurantapp.html")
            page.wait_for_selector("#directoryResults .card", timeout=10000)

            # Pastel Mode
            page.click("text=Temas")
            page.click("text=Modo Pastel")
            page.wait_for_timeout(1000)
            page.screenshot(path="/app/verification/pastel_mode_fixed.png")

            # Check for console errors
            # If there are no 404s for css, it's good.

        except Exception as e:
            print(f"Error during verification: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_directory()
