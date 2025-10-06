import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

  let firstName;
  let lastName;
  let postCode;
  let fullName;

test.beforeEach(async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postCode = faker.location.zipCode();
  fullName = `${firstName} ${lastName}`;

  await addCustomerPage.open();
  await addCustomerPage.fillFirstNameField(firstName);
  await addCustomerPage.fillLastNameField(lastName);
  await addCustomerPage.fillPostCodeField(postCode);
  await addCustomerPage.clickOnAddCustomerButton();
  await page.reload();

});

test('Assert manager can add new customer', async ({ page }) => {
  const openAccountPage = new OpenAccountPage(page);
  const bankManagerMainPage = new BankManagerMainPage(page);
  const customersListPage = new CustomersListPage(page);

  await openAccountPage.open();
  await openAccountPage.selectCustomerOption(fullName);
  await openAccountPage.selectRandomCurrency();
  await openAccountPage.clickOnProcessButton();
  await page.reload();
  await bankManagerMainPage.clickOnCustomersButton();
  await customersListPage.assertCustomerAccountNumberIsFilled(firstName, lastName, postCode);

});
