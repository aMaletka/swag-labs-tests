import { Locator, Page } from "@playwright/test"

export class CheckoutOverviewPage {
  public readonly page: Page
  public readonly buttonFinish: Locator
  public readonly removeButtonProductBike: Locator
  public readonly shoppingCartOverview: Locator
  public readonly backToContinueShopping: Locator

  public constructor(page: Page) {
    this.page = page
    this.buttonFinish = page.locator("#finish")
    this.removeButtonProductBike = page.locator("#remove-sauce-labs-bike-light")
    this.shoppingCartOverview = page.locator(".shopping_cart_container")
    this.backToContinueShopping = page.locator("#continue-shopping")
  }

  public async clickButtonFinish(): Promise<void> {
    await this.buttonFinish.click()
  }

  public async removeBikeProductInCart(): Promise<void> {
    await this.removeButtonProductBike.click()
  }

  public async clickButtonContinueShopping(): Promise<void> {
    await this.backToContinueShopping.click()
  }
}
