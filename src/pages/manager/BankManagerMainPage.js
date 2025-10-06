import { expect } from '@playwright/test';

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;
    this.addCustomerButton = page.getByRole('button', { name: 'Add Customer' });
    this.openAccountButton = page.getByRole('button', { name: 'Open Account' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
  }

  async open() {
    await this.page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager');
  }

  async clickOnAddCustomerButton() {
    await this.addCustomerButton.click();
  }

  async clickOnOpenAccountButton() {
    await this.openAccountButton.click();
  }

  async clickOnCustomersButton() {
    await this.customersButton.click();
  }

  async assertAddCustomerButton() {
    await expect(this.addCustomerButton).toBeVisible();
  }

  async assertOpenAccountButton() {
    await expect(this.openAccountButton).toBeVisible();
  }

  async assertCustomersButton() {
    await expect(this.customersButton).toBeVisible();
  }

}
