import { test, expect, Browser, chromium} from '@playwright/test'

test('Automation Checker game' , async({page})=> {

  //  await chromium.launch({headless: false})
    await page.goto("https://www.gamesforthebrain.com/game/checkers/")
    await expect(page).toHaveTitle("Checkers - Games for the Brain" )
    await expect(page.getByText('Select an orange piece to move.')).toBeVisible()

   // Select an orange piece to move.

   async function moveOrange(fromPos: number, toPos: number) {
  
  await page.locator(`[name="space${fromPos}"]`).click();
  await page.locator(`[name="space${toPos}"]`).click();
  await page.waitForTimeout(2000);
  await expect(page.getByText("Make a move.")).toBeVisible();
}
   await moveOrange(42,53)
   await moveOrange(22,33) 
   await moveOrange(32,43)
   await moveOrange(71,62)
   await moveOrange(11,22)
   
   // Restart
   await page.getByRole('link', { name: 'Restart...' }).click();

   //Count pieces after restart
const orangeCoins = await page.locator('img[src="you1.gif"]').count();
 expect(orangeCoins).toBe(12);

 await page.close();



   



})