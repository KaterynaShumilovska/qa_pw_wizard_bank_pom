import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

  let firstName;
  let lastName;
  let postCode;

test.beforeEach(async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postCode = faker.location.zipCode();

  await addCustomerPage.open();
  await addCustomerPage.fillFirstNameField(firstName);
  await addCustomerPage.fillLastNameField(lastName);
  await addCustomerPage.fillPostCodeField(postCode);
  await addCustomerPage.clickOnAddCustomerButton();

});

test('Assert manager can delete customer', async ({ page }) => {
  const customerListPage = new CustomersListPage(page);

  await customerListPage.open();
  await customerListPage.deleteCustomer(firstName, lastName, postCode);
  await customerListPage.assertCustomerRowIsHidden(firstName, lastName, postCode);
  await page.reload();
  await customerListPage.assertCustomerRowIsHidden(firstName, lastName, postCode);

});
