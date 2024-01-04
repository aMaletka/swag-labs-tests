import { Locator, Page } from "@playwright/test"

export class DashboardPage {
  public readonly page: Page
  public readonly hamburgerMenu: Locator
  public readonly iconShoppingCart: Locator
  public readonly buttonAddToCartFirst: Locator

  public constructor(page: Page) {
    this.page = page
    this.hamburgerMenu = page.locator("#react-burger-menu-btn")
    this.iconShoppingCart = page.locator(".shopping_cart_container")
    this.buttonAddToCartFirst = page.locator("#add-to-cart-sauce-labs-backpack")
  }

  public async addFirstProductToCart(): Promise<void> {
    await this.buttonAddToCartFirst.click()
  }

  public async goToShoppingCart(): Promise<void> {
    await this.iconShoppingCart.click()
  }
}
