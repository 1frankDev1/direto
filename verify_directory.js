const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 1000 });

  // Go to the page
  await page.goto('file://' + process.cwd() + '/docs/restaurantapp.html');
  await page.waitForTimeout(1000); // Wait for animations

  // Take screenshot of Light Mode
  await page.screenshot({ path: 'verify_light_directory.png' });

  // Change to Dark Mode
  await page.click('[data-theme-value="dark"]');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'verify_dark_directory.png' });

  // Change to Soft Mode
  await page.click('[data-theme-value="medio"]');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'verify_soft_directory.png' });

  // Verify Search
  await page.fill('#directorySearch', 'Tacos');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'verify_search_directory.png' });

  // Verify Sidebar Toggle (Mobile view)
  await page.setViewportSize({ width: 375, height: 812 });
  await page.click('#sidebarToggle');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'verify_mobile_sidebar.png' });

  await browser.close();
})();
