import { test, expect } from '../fixtures/pages';
import { customer } from '../test-data/users';

test.describe('Cart', () => {
  test('logged-in customer sees Bolt Cutters in the cart at the catalog price', async ({
    page,
    homePage,
    loginPage,
    accountPage,
    productPage,
    cartPage,
  }) => {
    const productName = 'Bolt Cutters';

    await homePage.open();
    await homePage.openSignIn();
    await loginPage.login(customer.email, customer.password);
    // await expect(page).toHaveURL(accountPage.urlPattern());

    await homePage.open();
    await homePage.search(productName);
    const catalogPrice = await homePage.productPrice(productName);

    await homePage.openProduct(productName);
    await productPage.addToCart();
    await productPage.openCart();

    await expect(cartPage.item(productName)).toBeVisible();
    await expect(
      cartPage.itemPrice(productName),
      `${productName} price in the cart should match the catalog price ${catalogPrice}`,
    ).toHaveText(catalogPrice);
  });
});
