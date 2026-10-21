import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  private readonly headingElement: Locator;
  private readonly productNameLabel: Locator;
  private readonly outOfStockBadge: Locator;
  private readonly addToCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.headingElement = page.getByRole('heading', { level: 1 });
    this.productNameLabel = page.getByTestId('product-name');
    this.outOfStockBadge = page.getByTestId('out-of-stock');
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
  }

  heading(): Locator {
    return this.headingElement;
  }

  productName(): Locator {
    return this.productNameLabel;
  }

  outOfStockLabel(): Locator {
    return this.outOfStockBadge;
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }
}
