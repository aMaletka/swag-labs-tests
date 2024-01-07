import { expect, test } from "@playwright/test"
import { checkPriceSort, loginToAccount } from "../support/helpers"
import { DashboardPage } from "../page-objects/DashboardPage"

test.describe("Product order", () => {
  test(`When user sort product by price (low to high) then sees the cheapest product first`, async ({ page }) => {
    await loginToAccount(page, "standard_user")
    const dashboardPage = new DashboardPage(page)

    const beforeSortPriceArray = await dashboardPage.getAllPrices()
    console.log(beforeSortPriceArray)
    let isSorted = await checkPriceSort(beforeSortPriceArray)
    expect(isSorted).toBeFalsy()

    await dashboardPage.selectHowToSortProducts("lohi")

    const afterSortPriceArray = await dashboardPage.getAllPrices()
    console.log(afterSortPriceArray)
    isSorted = await checkPriceSort(afterSortPriceArray)
    expect(isSorted).toBeTruthy()
  })
})
