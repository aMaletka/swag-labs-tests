import { Locator, Page } from "@playwright/test"
import { User } from "../builders/userBuilder"
import { BasePage } from "./BasePage"

export class CheckoutInformationPage extends BasePage {
  public readonly inputFirstNameCheckout: Locator
  public readonly inputLastnameCheckout: Locator
  public readonly inputpostalCodeCheckout: Locator
  public readonly buttonContinueCheckout: Locator
  public readonly buttonCancel: Locator

  public constructor(page: Page) {
    super(page)
    this.inputFirstNameCheckout = page.locator("#first-name")
    this.inputLastnameCheckout = page.locator("#last-name")
    this.inputpostalCodeCheckout = page.locator("#postal-code")
    this.buttonContinueCheckout = page.locator("#continue")
    this.buttonCancel = page.locator("#cancel")
  }

  public async fillFormCheckoutStepOne(user: User): Promise<void> {
    await this.inputFirstNameCheckout.fill(user.firstname)
    await this.inputLastnameCheckout.fill(user.lastname)
    await this.inputpostalCodeCheckout.fill(user.postelCode)
    await this.buttonContinueCheckout.click()
  }

  public async fillFormCheckoutStepOneWithoutClickButtonContinue(
    user: User
  ): Promise<void> {
    await this.inputFirstNameCheckout.fill(user.firstname)
    await this.inputLastnameCheckout.fill(user.lastname)
    await this.inputpostalCodeCheckout.fill(user.postelCode)
  }

  public async clickButtonCancel(): Promise<void> {
    await this.buttonCancel.click()
  }
}
