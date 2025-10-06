import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.selectCustomerLocator = page.locator('select[name="userSelect"]');
    this.selectCurrencyLocator = page.locator('select[name="currency"]');
  }

  async open() {
    await this.page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/openAccount');
  }

  async selectCustomerOption(fullName) {
    await this.selectCustomerLocator.selectOption({ label: fullName });
  };

  async selectCurrencyOption(currency) {
    await this.selectCurrencyLocator.selectOption({ value: currency });
  }

  async selectRandomCurrency() {
    const options = this.selectCurrencyLocator.locator('option');
    const count = await options.count();
    const randomIndex = Math.floor(Math.random() * (count - 1)) + 1;
    const value = await options.nth(randomIndex).getAttribute('value');

    await this.selectCurrencyLocator.selectOption(value);
  };

  async clickOnProcessButton() {
    await this.page.getByRole('button', { name: 'Process' }).click();
  }

  async assertCurrencyContains(currency) {
    await expect(this.selectCurrencyLocator.locator(`option[value="${currency}"]`)).toContainText(currency);
  }
}
