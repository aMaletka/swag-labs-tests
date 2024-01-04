import { Locator, Page } from "@playwright/test"

export class CheckoutInformationPage {
  public readonly page: Page
  public readonly inputFirstNameCheckout: Locator
  public readonly inputLastnameCheckout: Locator
  public readonly inputpostalCodeCheckout: Locator
  public readonly buttonContinueCheckout: Locator

  public constructor(page: Page) {
    this.page = page
    this.inputFirstNameCheckout = page.locator("#first-name")
    this.inputLastnameCheckout = page.locator("#last-name")
    this.inputpostalCodeCheckout = page.locator("#postal-code")
    this.buttonContinueCheckout = page.locator("#continue")
  }
  public async fillFormCheckoutStepOne(): Promise<void> {
    await this.inputFirstNameCheckout.fill("Anna")
    await this.inputLastnameCheckout.fill("Kowalska")
    await this.inputpostalCodeCheckout.fill("11-111")
    await this.buttonContinueCheckout.click()
  }
}
