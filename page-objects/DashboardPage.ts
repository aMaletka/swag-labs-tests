import { Locator, Page } from "@playwright/test"

export class DashboardPage {
  public readonly page: Page
  public readonly hamburgerMenu: Locator
  public readonly iconShoppingCart: Locator
  public readonly buttonAddToCartFirst: Locator
  public readonly buttonAddToCartSecond: Locator
  public readonly titleSecondProductBike: Locator

  public constructor(page: Page) {
    this.page = page
    this.hamburgerMenu = page.locator("#react-burger-menu-btn")
    this.iconShoppingCart = page.locator(".shopping_cart_container")
    this.buttonAddToCartFirst = page.locator("#add-to-cart-sauce-labs-backpack")
    this.buttonAddToCartSecond = page.locator(
      "#add-to-cart-sauce-labs-bike-light"
    )
    this.titleSecondProductBike = page.locator("#item_0_title_link")
  }

  public async addFirstProductToCart(): Promise<void> {
    await this.buttonAddToCartFirst.click()
  }
  public async addSecondProductToCart(): Promise<void> {
    await this.buttonAddToCartSecond.click()
  }

  public async goToShoppingCart(): Promise<void> {
    await this.iconShoppingCart.click()
  }

  public async goToDetailsBikeProduct(): Promise<void> {
    await this.titleSecondProductBike.click()
  }
}
