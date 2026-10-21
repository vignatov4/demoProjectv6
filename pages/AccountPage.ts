import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountPage extends BasePage {
  private readonly accountUrl = /\/account/;
  private readonly headingElement: Locator;

  constructor(page: Page) {
    super(page);
    this.headingElement = page.getByRole('heading', { name: 'My account' });
  }

  urlPattern(): RegExp {
    return this.accountUrl;
  }

  heading(): Locator {
    return this.headingElement;
  }
}
