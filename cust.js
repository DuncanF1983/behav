// instagramArchive.js

module.exports = async function instagramArchive(page) {
  // Zum Instagram-Profil wechseln (Profilname anpassen)
  await page.goto('https://www.instagram.com/spardabanknuernberg_/');

  // Alle Posts durch Scrollen laden
  let prevHeight = 0;
  while (true) {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000);
    let newHeight = await page.evaluate(() => document.body.scrollHeight);
    if (newHeight === prevHeight) break;
    prevHeight = newHeight;
  }

  // Freundesliste (Follower) öffnen und komplett laden
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

  // Optional: Gleiches Vorgehen für "Following"
  // await page.click('a[href$="/following/"]');
  // await page.waitForSelector('div[role="dialog"]');
  // ... analoges Scrollen wie oben
};
