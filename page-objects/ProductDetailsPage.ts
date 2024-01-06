import { Locator, Page } from "@playwright/test"
import { BasePage } from "./BasePage"

export class ProductDetailsPage extends BasePage {
  public readonly buttonAddToCart: Locator

  public constructor(page: Page) {
    super(page)
    this.buttonAddToCart = page.locator(".btn_primary")
  }

  public async clickAddToCart(): Promise<void> {
    await this.buttonAddToCart.click()
  }
}
