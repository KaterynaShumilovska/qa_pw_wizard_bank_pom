import { test } from '@playwright/test';

import { faker } from '@faker-js/faker';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test('Assert manager can add new customer', async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  const customersListPage = new CustomersListPage(page);
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

  await addCustomerPage.open();
  await addCustomerPage.fillFirstNameField(firstName);
  await addCustomerPage.fillLastNameField(lastName);
  await addCustomerPage.fillPostCodeField(postCode);
  await addCustomerPage.clickOnAddCustomerButton();
  await page.reload();
  await addCustomerPage.clickOnCustomersButton();

  await customersListPage.assertCustomerFirstName(firstName);
  await customersListPage.assertCustomerLastName(lastName);
  await customersListPage.assertCustomerPostCode(postCode);
  await customersListPage.assertCustomerAccountNumberIsEmpty();
  
});
