import { Locator, Page } from "@playwright/test"
import { User } from "../builders/userBuilder"

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

  public async fillFormCheckoutStepOne(user: User): Promise<void> {
    await this.inputFirstNameCheckout.fill(user.firstname)
    await this.inputLastnameCheckout.fill(user.lastname)
    await this.inputpostalCodeCheckout.fill(user.postelCode)
    await this.buttonContinueCheckout.click()
  }
}
