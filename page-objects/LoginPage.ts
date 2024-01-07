import { Locator, Page } from "@playwright/test"
import { BasePage } from "./BasePage"

export class LoginPage extends BasePage {
  public readonly inputUserName: Locator
  public readonly inputPassword: Locator
  public readonly loginButton: Locator
  public readonly errorMessage: Locator

  public constructor(page: Page) {
    super(page)
    this.inputUserName = page.locator("#user-name")
    this.inputPassword = page.locator("#password")
    this.loginButton = page.locator("#login-button")
    this.errorMessage = page.locator('[data-test="error"]')
  }

  public async goTo(): Promise<void> {
    await this.page.goto("/")
  }

  public async login(user: string, password: string): Promise<void> {
    await this.inputUserName.fill(user)
    await this.inputPassword.fill(password)
    await this.loginButton.click()
  }

  public async closeErrorXButton(): Promise<void> {
    await this.errorXButton.click()
  }
}
