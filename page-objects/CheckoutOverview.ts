import { Locator, Page } from "@playwright/test"
import { BasePage } from "./BasePage"

export class CheckoutOverviewPage extends BasePage {
  public readonly buttonFinish: Locator
  public readonly removeButtonProductBike: Locator
  public readonly backToContinueShopping: Locator

  public constructor(page: Page) {
    super(page)
    this.buttonFinish = page.locator("#finish")
    this.removeButtonProductBike = page.locator("#remove-sauce-labs-bike-light")
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
