const { chromium } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'C:/Users/angel/portfolio/verify-screenshot-home.png', fullPage: false });
  // Scroll to projects section
  await page.evaluate(() => document.getElementById('projects')?.scrollIntoView());
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'C:/Users/angel/portfolio/verify-screenshot-projects.png', fullPage: false });
  // Check body::before grain and section backgrounds
  const bodyBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  const sectionGreen = await page.evaluate(() => {
    const el = document.querySelector('.section-green');
    return el ? getComputedStyle(el).backgroundColor : 'NOT FOUND';
  });
  const initialFont = await page.evaluate(() => {
    const el = document.querySelector('.initial');
    return el ? getComputedStyle(el).fontFamily : 'NOT FOUND';
  });
  const bodyFont = await page.evaluate(() => getComputedStyle(document.body).fontFamily);
  console.log('body bg:', bodyBg);
  console.log('section-green bg:', sectionGreen);
  console.log('.initial font:', initialFont);
  console.log('body font:', bodyFont);
  await browser.close();
})();
