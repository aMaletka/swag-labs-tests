import { Locator, Page, expect } from "@playwright/test"

export class BasePage {
  public readonly page: Page
  public readonly iconShoppingCart: Locator
  public readonly errorXButton: Locator

  public constructor(page: Page) {
    this.page = page
    this.iconShoppingCart = page.locator("#shopping_cart_container")
    this.errorXButton = page.locator(".error-button")
  }

  public async verifyQuantityInCart(quantitiy: string): Promise<void> {
    await expect(this.iconShoppingCart).toHaveText(quantitiy)
  }
  public async verifyEmptyCart(): Promise<void> {
    await expect(this.iconShoppingCart).toBeEmpty()
  }

  public async closeErrorXButton(): Promise<void> {
    await this.errorXButton.click()
  }
}
