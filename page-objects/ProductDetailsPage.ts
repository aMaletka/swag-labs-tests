import { Locator, Page } from "@playwright/test"

export class ProductDetailsPage {
  public readonly page: Page
  public readonly buttonAddToCart: Locator
  public readonly shoppingCartDetails: Locator

  public constructor(page: Page) {
    this.page = page
    this.buttonAddToCart = page.locator(".btn_primary")
    this.shoppingCartDetails = page.locator("#shopping_cart_container")
  }

  public async clickAddToCart(): Promise<void> {
    await this.buttonAddToCart.click()
  }
}
