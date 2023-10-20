import {test, expect} from "@playwright/test"

test.skip("Product Page Add To Basket", async ({ page }) => 
{
    await page.goto("/")
//  await page.pause()

const  addToBasketButton  = page.locator('[data-qa="product-button"]').first()

const basketCounter = page.locator('[data-qa="header-basket-count"]')

await addToBasketButton.waitFor()

await expect(addToBasketButton).toHaveText("Add to Basket")
await expect(basketCounter).toHaveText("0")

await addToBasketButton.click()

await expect(addToBasketButton).toHaveText("Remove from Basket")
await expect(basketCounter).toHaveText("1")

//    console.log(await page.getByRole('button', {name: 'Add To Basket' }).count())

await page.pause()



})




//Example function:npm test


// const addTwoNumbers = (a,b) => 
// {
//     console.log("Adding two numbers")
//     return a + b
// }