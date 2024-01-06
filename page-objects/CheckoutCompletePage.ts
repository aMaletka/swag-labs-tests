import { Locator, Page } from "@playwright/test"
import { BasePage } from "./BasePage"

export class CheckoutCompletePage extends BasePage {
  public readonly buttonBackHome: Locator

  public constructor(page: Page) {
    super(page)
    this.buttonBackHome = page.locator("#back-to-products")
  }

  public async clickButtonBackHome(): Promise<void> {
    await this.buttonBackHome.click()
  }
}
