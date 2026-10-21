import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  private readonly cartRows: Locator;

  constructor(page: Page) {
    super(page);
    this.cartRows = page.getByRole('row');
  }

  item(name: string): Locator {
    return this.cartRows.filter({ has: this.page.getByTestId('product-title').filter({ hasText: name }) });
  }

  itemPrice(name: string): Locator {
    return this.item(name).getByTestId('product-price');
  }
}
