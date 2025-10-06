import { test } from '@playwright/test';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';

test('Assert manager can choose currencies for account', async ({ page }) => {
  const openAccountPage = new OpenAccountPage(page);

  await openAccountPage.open();
  await openAccountPage.assertCurrencyContains('Dollar');
  await openAccountPage.selectCurrencyOption('Dollar');
  await openAccountPage.assertCurrencyContains('Pound');
  await openAccountPage.selectCurrencyOption('Pound');
  await openAccountPage.assertCurrencyContains('Rupee');
  await openAccountPage.selectCurrencyOption('Rupee');

});
