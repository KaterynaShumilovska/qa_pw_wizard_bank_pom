import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.rowOfCustomersTable = page.locator('tbody tr');
    this.lastRowOfCustomersTable = page.locator('tbody tr').last();
    this.customerRowOfCustomersTable = (firstName, lastName, postCode) =>
      page.locator('tbody tr').filter({
        has: page.locator(`td:has-text("${firstName}")`)
      }).filter({
        has: page.locator(`td:has-text("${lastName}")`)
      }).filter({
        has: page.locator(`td:has-text("${postCode}")`)
      });
    this.searchCustomerLocator = page.getByPlaceholder('Search Customer');
  }

  async open() {
    await this.page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/list');
  }

  async deleteCustomer(firstName, lastName, postCode) {
    await this.customerRowOfCustomersTable(firstName, lastName, postCode).getByRole('button').click();
  }

  async assertCustomerFirstName(firstName) {
    await expect(this.lastRowOfCustomersTable.locator('td').nth(0)).toContainText(firstName);
  }

  async assertCustomerLastName(lastName) {
    await expect(this.lastRowOfCustomersTable.locator('td').nth(1)).toContainText(lastName);
  }

  async assertCustomerPostCode(postCode) {
    await expect(this.lastRowOfCustomersTable.locator('td').nth(2)).toContainText(postCode);
  }

  async assertCustomerAccountNumberIsEmpty() {
    await expect(this.lastRowOfCustomersTable.locator('td').nth(3)).toHaveText('');
  }

  async assertCustomerAccountNumberIsFilled(firstName, lastName, postCode) {
    await expect(this.customerRowOfCustomersTable(firstName, lastName, postCode).locator('td').nth(3)).toBeVisible();
  }

  async assertCustomerRowIsHidden(firstName, lastName, postCode) {
    await expect(this.customerRowOfCustomersTable(firstName, lastName, postCode)).toBeHidden();
  }

  async assertCustomerRowIsVisible(firstName, lastName, postCode) {
    await expect(this.customerRowOfCustomersTable(firstName, lastName, postCode)).toBeVisible();
  }

  async fillSearchCustomerField(firstName) {
    await this.searchCustomerLocator.fill(firstName);
  }

  async assertOnlyOneCustomerRowPresent() {
    await expect(this.rowOfCustomersTable).toHaveCount(1);
  }

}
