import { Locator, Page } from "@playwright/test"

export class ShoppingCartPage {
  public readonly page: Page
  public readonly buttonCheckout: Locator

  public constructor(page: Page) {
    this.page = page
    this.buttonCheckout = page.locator("#checkout")
  }

  public async goToCheckout(): Promise<void> {
    await this.buttonCheckout.click()
  }
}
