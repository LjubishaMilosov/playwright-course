import { test } from "@playwright/test"
import { myAcountPage } from "../page-objects/MyAccountPage.js"
import { getLoginToken } from "./../api-calls/getLoginToken.js"
import { adminDetails } from "./../data/userDetails.js"

test("My Account using cookie injection and mocking network requests", async ({page}) => {

    const loginToken = await getLoginToken(adminDetails.username, adminDetails.password)
    //console.warn({loginToken})

    await page.route("**/api/user**", async (route, request) =>{
        await route.fulfill({
            status: 500,
            contentType: "application/json",
            body: JSON.stringify({message: "PLAYWRIGHT ERROR FROM MOCKING"})
        })

    })

    const myAcount = new myAcountPage(page)
    await myAcount.visit()
   
    await page.evaluate(([loginTokenInsideBrowserCode]) => {

        document.cookie = "token=" + loginTokenInsideBrowserCode
    }, [loginToken])

    await myAcount.visit()
    await myAcount.waitForPageHeading()
    await myAcount.waitForErrorMessage()

})