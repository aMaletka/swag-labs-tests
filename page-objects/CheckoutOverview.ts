import { Locator, Page } from "@playwright/test"

export class CheckoutOverviewPage {
  public readonly page: Page
  public readonly buttonFinish: Locator

  public constructor(page: Page) {
    this.page = page
    this.buttonFinish = page.locator("#finish")
  }

  public async clickButtonFinish(): Promise<void> {
    await this.buttonFinish.click()
  }
}
