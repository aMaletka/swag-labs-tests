import { Locator, Page } from "@playwright/test"

export class DashboardPage {
  public readonly page: Page
  public readonly hamburgerMenu: Locator
  public readonly shoppingCart: Locator

  public constructor(page: Page) {
    this.page = page
    this.hamburgerMenu = page.locator("#react-burger-menu-btn")
    this.shoppingCart = page.locator(".shopping_cart_container")
  }
}
