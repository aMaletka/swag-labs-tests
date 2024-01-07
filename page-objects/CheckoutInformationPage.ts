import { Locator, Page } from "@playwright/test"
import { BasePage } from "./BasePage"

export class CheckoutInformationPage extends BasePage {
  public readonly inputFirstNameCheckout: Locator
  public readonly inputLastNameCheckout: Locator
  public readonly inputpostalCodeCheckout: Locator
  public readonly buttonContinueCheckout: Locator
  public readonly buttonCancel: Locator
  public readonly errorMessage: Locator

  public constructor(page: Page) {
    super(page)
    this.inputFirstNameCheckout = page.locator("#first-name")
    this.inputLastNameCheckout = page.locator("#last-name")
    this.inputpostalCodeCheckout = page.locator("#postal-code")
    this.buttonContinueCheckout = page.locator("#continue")
    this.buttonCancel = page.locator("#cancel")
    this.errorMessage = page.locator(".error-message-container")
  }

  public async fillFormCheckoutStepOne(firstname: string, lastname: string, postalCode: string): Promise<void> {
    await this.inputFirstNameCheckout.fill(firstname)
    await this.inputLastNameCheckout.fill(lastname)
    await this.inputpostalCodeCheckout.fill(postalCode)
  }

  public async clickButtonContinue(): Promise<void> {
    await this.buttonContinueCheckout.click()
  }

  public async clickButtonCancel(): Promise<void> {
    await this.buttonCancel.click()
  }
}
