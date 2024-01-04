import { expect, test } from "@playwright/test"
import { LoginPage } from "../page-objects/LoginPage"
import { DashboardPage } from "../page-objects/DashboardPage"

test.describe("Login page", () => {
  test(`When user log in to panel with correctly 
  username and password then user sees dashboard`, async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goTo()
    await loginPage.login("standard_user", "secret_sauce")
    const dashboardPage = new DashboardPage(page)
    await expect(dashboardPage.hamburgerMenu).toBeVisible()
  })

  test(`When blocked user logs in to the panel,
   then user receive information that user is blocked`, async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goTo()
    await loginPage.login("locked_out_user", "secret_sauce")
    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Sorry, this user has been locked out."
    )
    await loginPage.closeErrorXButton()
  })

  test(`When user logs in using the panel without a username, 
  then user receive a message asking for a username`, async ({ page }) => {
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

  test(`When user log in with panel without password, 
  then user receive a message password is required`, async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goTo()
    await loginPage.login("performance_glitch_user", "")
    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Password is required"
    )
    await loginPage.closeErrorXButton()
    await loginPage.login("performance_glitch_user", "secret_sauce")
    const dashboardPage = new DashboardPage(page)
    await expect(dashboardPage.iconShoppingCart).toBeVisible()
  })

  test(`When user log in to panel without data,
   then user receive a message username is required`, async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goTo()
    await loginPage.login("", "")
    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Username is required"
    )
    await loginPage.closeErrorXButton()
    await loginPage.login("problem_user", "secret_sauce")
    const dashboardPage = new DashboardPage(page)
    await expect(dashboardPage.iconShoppingCart).toBeVisible()
  })
  test(`When user provides incorrect login details,
   then user receive a message that they don't match any user in this service`, async ({
    page,
  }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goTo()
    await loginPage.login("xyz", "yxz")
    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    )
    await loginPage.closeErrorXButton()
    await loginPage.login("standard_user", "secret_sauce")
    const dashboardPage = new DashboardPage(page)
    await expect(dashboardPage.hamburgerMenu).toBeVisible()
  })
})
