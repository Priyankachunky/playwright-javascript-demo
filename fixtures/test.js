import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { loadTestData } from '../utils/testDataLoader.js';

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  testData: async ({}, use) => {
    await use(loadTestData());
  }
});

export { expect };
