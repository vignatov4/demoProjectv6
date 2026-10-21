import { test, expect } from '../fixtures/pages';
import { customer } from '../test-data/users';

test.describe('Login', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
    await homePage.openSignIn();
  });

  test('customer can log in and see their account page', async ({ page, loginPage, accountPage }) => {
    await loginPage.login(customer.email, customer.password);
    await expect(page).toHaveURL(accountPage.urlPattern());
    await expect(accountPage.heading()).toBeVisible();
    await expect(accountPage.userMenu(customer.name)).toBeVisible();
  });

  // test('fails with an unknown email and wrong password', async ({ page, loginPage }) => {
  //   await loginPage.login(unknownUser.email, unknownUser.password);

  //   await expect(loginPage.loginError()).toHaveText('Invalid email or password');
  //   await expect(page).toHaveURL(loginPage.urlPattern());
  // });

  // test('shows required-field errors when the form is empty', async ({ page, loginPage }) => {
  //   await loginPage.submit();

  //   await expect(loginPage.emailError()).toHaveText('Email is required');
  //   await expect(loginPage.passwordError()).toHaveText('Password is required');
  //   await expect(page).toHaveURL(loginPage.urlPattern());
  // });
});
