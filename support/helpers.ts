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

export type SortProducts = "az" | "za" | "lohi" | "hilo"

export const checkPriceSort = async (values: string[]): Promise<boolean> => {
  const arr: number[] = values.map((value) => parseFloat(value.replace("$", "")))

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return false
    }
  }
  return true
}

export const checkNameSort = async (values: string[]): Promise<boolean> => {
  for (let i = 0; i < values.length - 1; i++) {
    if (values[i] < values[i + 1]) {
      return false
    }
  }
  return true
}
