import { test } from '@playwright/test';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { BankHomePage } from '../../../src/pages/BankHomePage';

test('Assert manager can Login', async ({ page }) => {
  const bankHomePage = new BankHomePage(page);
  const bankManagerMainPage = new BankManagerMainPage(page);

  await bankHomePage.open();
  await bankHomePage.clickBankManagerLoginButton();
  
  await bankManagerMainPage.assertAddCustomerButton();
  await bankManagerMainPage.assertOpenAccountButton();
  await bankManagerMainPage.assertCustomersButton();
  
});
