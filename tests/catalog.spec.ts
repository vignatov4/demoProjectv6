import { test, expect } from '../fixtures/pages';

// test.describe.configure({ mode: 'parallel' });

test.beforeEach(async ({ homePage }) => {
  await homePage.open();
});

test.describe('Product grid', () => {
  test('shows more than one product', async ({ homePage }) => {
    await expect(homePage.productNames().nth(1)).toBeVisible();
  });

  test('filtering by Hammer shows only hammers', async ({ homePage }) => {
    await homePage.filterByCategory('Hammer');

    await expect(homePage.productNames().filter({ hasNotText: /hammer/i })).toHaveCount(0);
    await expect(homePage.productNames().first()).toContainText(/hammer1/i);
  });

  test('searching for Long Nose Pliers shows it in the results', async ({ homePage }) => {
    await homePage.search('Long Nose Pliers');

    await expect(homePage.productName('Long Nose Pliers')).toBeVisible();
  });
});

test.describe('Product details', () => {
  test('shows the same name as the grid for the first product', async ({ homePage, productPage }) => {
    await expect(homePage.productNames().first()).toBeVisible();
    const gridName = await homePage.firstProductName();

    await homePage.openFirstProduct();

    await expect(productPage.heading()).toHaveText(gridName);
  });

  test('opens Combination Pliers from the grid', async ({ homePage, productPage }) => {
    await homePage.openProduct('Combination Pliers');

    await expect(productPage.productName()).toContainText('Combination Pliers');
  });

  test('opens Claw Hammer from the grid', async ({ homePage, productPage }) => {
    await homePage.openProduct('Claw Hammer');

    await expect(productPage.productName()).toContainText('Claw Hammer');
  });

  test('opens Thor Hammer from search results within the Hammer category', async ({ homePage, productPage }) => {
    await homePage.filterByCategory('Hammer');
    await homePage.search('Thor Hammer');
    await homePage.openProduct('Thor Hammer');

    await expect(productPage.productName()).toContainText('Thor Hammer');
  });

  test('opens Thor Hammer from the Hammer category', async ({ homePage, productPage }) => {
    await homePage.filterByCategory('Hammer');
    await homePage.openProduct('Thor Hammer');

    await expect(productPage.productName()).toContainText('Thor Hammer');
  });

  test('opens the most expensive Hand Tools product', async ({ homePage, productPage }) => {
    await homePage.sortBy('Price (High - Low)');
    await homePage.filterByCategory('Hand Tools');
    await homePage.openFirstProduct();

    await expect(productPage.productName()).toBeVisible();
  });

  test('shows the out-of-stock label for an out-of-stock product', async ({ homePage, productPage }) => {
    await homePage.openFirstOutOfStockProduct();

    await expect(productPage.outOfStockLabel()).toContainText('Out of stock');
  });
});
