import { Page } from "@playwright/test"
import { LoginPage } from "../page-objects/LoginPage"

export type User =
  | "standard_user"
  | "locked_out_user"
  | "problem_user"
  | "performance_glitch_user"
  | "error_user"
  | "visual_user"

export const loginToAccount = async (page: Page, user: User): Promise<void> => {
  const loginPage = new LoginPage(page)
  await loginPage.goTo()
  await loginPage.inputUserName.fill(user)
  await loginPage.inputPassword.fill("secret_sauce")
  await loginPage.loginButton.click()
}
