import { isDesktopViewport } from "../utils/isDesktopViewport"

export class Navigation{
    
constructor(page)
{
    this.page = page

    this.basketCounter = page.locator('[data-qa="header-basket-count"]')
    this.checkoutLink = page.getByRole('link', { name: 'Checkout' })
    this.mobileBurgerbutton = page.locator('[data-qa="burger-button"]')
}

getbasketCount = async () =>
{
    await this.basketCounter.waitFor()
    const text = await this.basketCounter.innerText()
    return parseInt(text,10)
}

goToCheckout = async () =>
{

    if(!isDesktopViewport(this.page)){
        await this.mobileBurgerbutton.waitFor()
        await this.mobileBurgerbutton.click()
    }
    
    await this.checkoutLink.waitFor()
    await this.checkoutLink.click()
    await this.page.waitForURL("/basket")

}



}