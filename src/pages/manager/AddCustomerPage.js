export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameField = page.getByPlaceholder('First Name');
    this.lastNameField = page.getByPlaceholder('Last Name');
    this.postCodeField = page.getByPlaceholder('Post Code');
    this.addCustomerButton = page.locator('button[type="submit"]');
    this.customersButtonLocator = page.getByRole('button', { name: 'Customers' });
  }

  async open() {
    await this.page.goto('./#/manager/addCust');
  }

  async fillFirstNameField(firstName) {
    await this.firstNameField.fill(firstName);
  }

  async fillLastNameField(lastName) {
    await this.lastNameField.fill(lastName);
  }

  async fillPostCodeField(postCode) {
    await this.postCodeField.fill(postCode);
  }

  async clickOnAddCustomerButton() {
    this.page.once('dialog', async (dialog) => { await dialog.accept(); });
    await this.addCustomerButton.click();
  }

  async clickOnCustomersButton() {
    await this.customersButtonLocator.click();
  }

}
