import { expect, test } from "@playwright/test"
import { loginToAccount } from "../support/helpers"
import { DashboardPage } from "../page-objects/DashboardPage"
import { ShoppingCartPage } from "../page-objects/ShoppingCartPage"
import { CheckoutInformationPage } from "../page-objects/CheckoutInformationPage"
import { CheckoutOverviewPage } from "../page-objects/CheckoutOverview"
import { CheckoutCompletePage } from "../page-objects/CheckoutCompletePage"

test.describe("Product sales process", () => {
  test(`When user buy product and fill form 
  then user receiver a message with purchase a product`, async ({ page }) => {
    await loginToAccount(page, "standard_user")
    const dashboardPage = new DashboardPage(page)
    await expect(dashboardPage.iconShoppingCart).toBeEmpty()
    await dashboardPage.addFirstProductToCart()
    await expect(dashboardPage.iconShoppingCart).toHaveText("1")
    await dashboardPage.goToShoppingCart()
    const shoppingCartPage = new ShoppingCartPage(page)
    await shoppingCartPage.goToCheckout()
    const checkoutInformationPage = new CheckoutInformationPage(page)
    await checkoutInformationPage.fillFormCheckoutStepOne()
    const checkoutOverviewPage = new CheckoutOverviewPage(page)
    await checkoutOverviewPage.clickButtonFinish()
    const checkoutCompletePage = new CheckoutCompletePage(page)
    await checkoutCompletePage.clickButtonBackHome()
    await expect(dashboardPage.iconShoppingCart).toBeEmpty()
  })
})
