import { expect, test } from "@playwright/test"
import { LoginPage } from "../page-objects/LoginPage"
import { DashboardPage } from "../page-objects/DashboardPage"

test.describe("Login page", () => {
  test("User logs in to the dashboard correctly", async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goTo()
    await loginPage.login("standard_user", "secret_sauce")
    const dashboardPage = new DashboardPage(page)
    await expect(dashboardPage.hamburgerMenu).toBeVisible()
  })

  test("The blocked user cannot log in to the dashboard", async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goTo()
    await loginPage.login("locked_out_user", "secret_sauce")
    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Sorry, this user has been locked out."
    )
    await loginPage.closeErrorXButton()
  })

  test("User is trying to log in to the panel without using a login", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goTo()
    await loginPage.login("", "secret_sauce")
    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Username is required"
    )
    await loginPage.closeErrorXButton()
    await loginPage.login("visual_user", "secret_sauce")
    const dashboardPage = new DashboardPage(page)
    await expect(dashboardPage.hamburgerMenu).toBeVisible()
  })

  test("User is trying to log in to the panel without using a password", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goTo()
    await loginPage.login("performance_glitch_user", "")
    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Password is required"
    )
    await loginPage.closeErrorXButton()
    await loginPage.login("performance_glitch_user", "secret_sauce")
    const dashboardPage = new DashboardPage(page)
    await expect(dashboardPage.shoppingCart).toBeVisible()
  })

  test("User is trying to log in to the panel without using any data", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goTo()
    await loginPage.clickLoginButton()
    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Username is required"
    )
    await loginPage.closeErrorXButton()
    await loginPage.login("problem_user", "secret_sauce")
    const dashboardPage = new DashboardPage(page)
    await expect(dashboardPage.shoppingCart).toBeVisible()
  })
})
