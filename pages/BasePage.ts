import { type Locator, type Page } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;
  private readonly mainMenu: Locator;
  private readonly signInLink: Locator;
  private readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainMenu = page.getByRole('menubar', { name: 'Main menu' });
    this.signInLink = page.getByRole('link', { name: 'Sign in' });
    this.cartLink = this.mainMenu.getByRole('link', { name: 'cart' });
  }

  async goto(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async openSignIn(): Promise<void> {
    await this.signInLink.click();
  }

  // The cart link only appears after something is added, so clicking it also waits for the add to finish.
  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  userMenu(userName: string): Locator {
    return this.mainMenu.getByRole('button', { name: userName });
  }
}
