import { expect, test } from "@playwright/test"
import { loginToAccount } from "../support/helpers"
import { DashboardPage } from "../page-objects/DashboardPage"
import { ShoppingCartPage } from "../page-objects/ShoppingCartPage"
import { CheckoutInformationPage } from "../page-objects/CheckoutInformationPage"
import { CheckoutOverviewPage } from "../page-objects/CheckoutOverview"
import { CheckoutCompletePage } from "../page-objects/CheckoutCompletePage"
import { getUserData } from "../builders/userBuilder"
import { ProductDetailsPage } from "../page-objects/ProductDetailsPage"

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
    await checkoutInformationPage.fillFormCheckoutStepOne(user.firstname, user.lastname, user.postalCode)
    await checkoutInformationPage.clickButtonContinue()
    const checkoutOverviewPage = new CheckoutOverviewPage(page)
    await checkoutOverviewPage.clickButtonFinish()
    const checkoutCompletePage = new CheckoutCompletePage(page)
    await checkoutCompletePage.clickButtonBackHome()
    await dashboardPage.verifyEmptyCart()
  })
  test(`Given user can add product to cart 
  then remove it and add this product again from product details page`, async ({ page }) => {
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
  test(`When user fill form and click cancel then user information is cleared`, async ({ page }) => {
    const user = getUserData()
    await loginToAccount(page, "standard_user")
    const dashboardPage = new DashboardPage(page)
    await dashboardPage.addFirstProductToCart()
    await dashboardPage.goToShoppingCart()
    const shoppingCartPage = new ShoppingCartPage(page)
    await shoppingCartPage.goToCheckout()
    const checkoutInformationPage = new CheckoutInformationPage(page)
    await checkoutInformationPage.fillFormCheckoutStepOne(user.firstname, user.lastname, user.postalCode)
    await expect(checkoutInformationPage.inputFirstNameCheckout).toHaveValue(user.firstname)
    await expect(checkoutInformationPage.inputLastNameCheckout).toHaveValue(user.lastname)
    await expect(checkoutInformationPage.inputpostalCodeCheckout).toHaveValue(user.postalCode)
    await checkoutInformationPage.clickButtonCancel()
    await shoppingCartPage.goToCheckout()
    await expect(checkoutInformationPage.inputFirstNameCheckout).toBeEmpty()
    await expect(checkoutInformationPage.inputLastNameCheckout).toBeEmpty()
    await expect(checkoutInformationPage.inputpostalCodeCheckout).toBeEmpty()
  })
  test(`When user fill information in checkout without firstname,
   then user receiver message about lack of name`, async ({ page }) => {
    const user = getUserData()
    await loginToAccount(page, "standard_user")
    const dashboardPage = new DashboardPage(page)
    await dashboardPage.addFirstProductToCart()
    await dashboardPage.goToShoppingCart()
    const shoppingCartPage = new ShoppingCartPage(page)
    await shoppingCartPage.goToCheckout()
    const checkoutInformationPage = new CheckoutInformationPage(page)
    await checkoutInformationPage.fillFormCheckoutStepOne("", user.lastname, user.postalCode)
    await checkoutInformationPage.clickButtonContinue()
    await expect(checkoutInformationPage.errorMessage).toHaveText("Error: First Name is required")
    await checkoutInformationPage.closeErrorXButton()
    await checkoutInformationPage.fillFormCheckoutStepOne(user.firstname, user.lastname, user.postalCode)
    await checkoutInformationPage.clickButtonContinue()
  })
})
