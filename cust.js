module.exports = async function instagramArchive(page) {
  await page.goto('https://www.instagram.com/spardabanknuernberg_/');

  let prevHeight = 0;
  while (true) {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000);
    let newHeight = await page.evaluate(() => document.body.scrollHeight);
    if (newHeight === prevHeight) break;
    prevHeight = newHeight;
  }

  await page.click('a[href$="/followers/"]');
  await page.waitForSelector('div[role="dialog"]');
  let prevFollowerHeight = 0;
  while (true) {
    await page.evaluate(() => {
      const dialog = document.querySelector('div[role="dialog"]');
      if (dialog) dialog.scrollTo(0, dialog.scrollHeight);
    });
    await page.waitForTimeout(2000);
    let newFollowerHeight = await page.evaluate(() => {
      const dialog = document.querySelector('div[role="dialog"]');
      return dialog ? dialog.scrollHeight : 0;
    });
    if (newFollowerHeight === prevFollowerHeight) break;
    prevFollowerHeight = newFollowerHeight;
  }
};
