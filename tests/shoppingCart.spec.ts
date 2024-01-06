import { expect, test } from "@playwright/test"
import { loginToAccount } from "../support/helpers"
import { DashboardPage } from "../page-objects/DashboardPage"
import { ShoppingCartPage } from "../page-objects/ShoppingCartPage"
import { CheckoutInformationPage } from "../page-objects/CheckoutInformationPage"
import { CheckoutOverviewPage } from "../page-objects/CheckoutOverview"
import { CheckoutCompletePage } from "../page-objects/CheckoutCompletePage"
import { getUserData } from "../builders/userBuilder"
import { ProductDetailsPage } from "../page-objects/ProductDetailsPage"
import { userInfo } from "os"

test.describe("Product sales process", () => {
  test(`When user buy product and fill form 
  then user receiver a message with purchase a product`, async ({ page }) => {
    const user = getUserData()

    await loginToAccount(page, "standard_user")
    const dashboardPage = new DashboardPage(page)
    await dashboardPage.verifyEmptyCart()
    await dashboardPage.addFirstProductToCart()
    await dashboardPage.verifyQuantityInCart("1")
    await dashboardPage.goToShoppingCart()
    const shoppingCartPage = new ShoppingCartPage(page)
    await shoppingCartPage.goToCheckout()
    const checkoutInformationPage = new CheckoutInformationPage(page)
    await checkoutInformationPage.fillFormCheckoutStepOne(user)
    const checkoutOverviewPage = new CheckoutOverviewPage(page)
    await checkoutOverviewPage.clickButtonFinish()
    const checkoutCompletePage = new CheckoutCompletePage(page)
    await checkoutCompletePage.clickButtonBackHome()
    await dashboardPage.verifyEmptyCart()
  })
  test(`Given user can add product to cart 
  then remove it and add this product again from product details page`, async ({
    page,
  }) => {
    await loginToAccount(page, "standard_user")
    const dashboardPage = new DashboardPage(page)
    await dashboardPage.verifyEmptyCart()
    await dashboardPage.addFirstProductToCart()
    await dashboardPage.addSecondProductToCart()
    await dashboardPage.verifyQuantityInCart("2")
    await dashboardPage.goToShoppingCart()
    const checkoutOverviewPage = new CheckoutOverviewPage(page)
    await checkoutOverviewPage.removeBikeProductInCart()
    await checkoutOverviewPage.verifyQuantityInCart("1")
    await checkoutOverviewPage.clickButtonContinueShopping()
    await dashboardPage.goToDetailsBikeProduct()
    const productDetailsPage = new ProductDetailsPage(page)
    await productDetailsPage.verifyQuantityInCart("1")
    await productDetailsPage.clickAddToCart()
    await productDetailsPage.verifyQuantityInCart("2")
  })
})
test.describe("Form validity in checkout", () => {
  test(`When user fill form and click cancel then user information is cleared`, async ({
    page,
  }) => {
    const user = getUserData()
    await loginToAccount(page, "standard_user")
    const dashboardPage = new DashboardPage(page)
    await dashboardPage.addFirstProductToCart()
    await dashboardPage.goToShoppingCart()
    const shoppingCartPage = new ShoppingCartPage(page)
    await shoppingCartPage.goToCheckout()
    const checkoutInformationPage = new CheckoutInformationPage(page)
    await checkoutInformationPage.fillFormCheckoutStepOneWithoutClickButtonContinue(
      user
    )
    await checkoutInformationPage.clickButtonCancel()
    await shoppingCartPage.goToCheckout()
    await expect(checkoutInformationPage.inputFirstNameCheckout).toBeEmpty()
    await expect(checkoutInformationPage.inputLastnameCheckout).toBeEmpty()
    await expect(checkoutInformationPage.inputpostalCodeCheckout).toBeEmpty()
  })
})
