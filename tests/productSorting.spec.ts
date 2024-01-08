import { expect, test } from "@playwright/test"
import { checkPriceSort, checkNameSort, loginToAccount } from "../support/helpers"
import { DashboardPage } from "../page-objects/DashboardPage"

test.describe("Product order", () => {
  test(`When user sort product by price (low to high) then sees the cheapest product first`, async ({ page }) => {
    await loginToAccount(page, "standard_user")
    const dashboardPage = new DashboardPage(page)

    const beforeSortPriceArray = await dashboardPage.getAllPrices()
    let isSorted = await checkPriceSort(beforeSortPriceArray)
    expect(isSorted).toBeFalsy()

    await dashboardPage.selectHowToSortProducts("lohi")

    const afterSortPriceArray = await dashboardPage.getAllPrices()
    isSorted = await checkPriceSort(afterSortPriceArray)
    expect(isSorted).toBeTruthy()
  })

  test(`When user sort product by name (Z to A),
  then sees products sorted alphabetically from Z to A`, async ({ page }) => {
    await loginToAccount(page, "standard_user")
    const dashboardPage = new DashboardPage(page)
    const beforeSortNameArray = await dashboardPage.getAllNames()
    let isSorted = await checkNameSort(beforeSortNameArray)
    expect(isSorted).toBeFalsy()
    await dashboardPage.selectHowToSortProducts("za")
    const afterSortNameArray = await dashboardPage.getAllNames()
    isSorted = await checkNameSort(afterSortNameArray)
    expect(isSorted).toBeTruthy()
  })
})
