import { Locator, Page } from "@playwright/test"
import { BasePage } from "./BasePage"

export class ShoppingCartPage extends BasePage {
  public readonly buttonCheckout: Locator

  public constructor(page: Page) {
    super(page)
    this.buttonCheckout = page.locator("#checkout")
  }

  public async goToCheckout(): Promise<void> {
    await this.buttonCheckout.click()
  }
}
