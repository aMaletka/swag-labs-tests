import { Locator, Page } from "@playwright/test"

export class CheckoutCompletePage {
  public readonly page: Page
  public readonly buttonBackHome: Locator

  public constructor(page: Page) {
    this.page = page
    this.buttonBackHome = page.locator("#back-to-products")
  }

  public async clickButtonBackHome(): Promise<void> {
    await this.buttonBackHome.click()
  }
}
