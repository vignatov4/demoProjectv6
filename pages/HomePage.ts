import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  private readonly sortSelect: Locator;
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;
  private readonly productNameLabels: Locator;
  private readonly outOfStockProducts: Locator;
  private readonly learnCoursesLink: Locator;

  constructor(page: Page) {
    super(page);
    this.sortSelect = page.getByRole('combobox', { name: 'sort' });
    this.searchInput = page.getByPlaceholder('Search');
    this.searchButton = page.getByRole('button', { name: 'Search', exact: true });
    this.productNameLabels = page.getByTestId('product-name');
    this.outOfStockProducts = page.getByRole('link').filter({ hasText: 'Out of stock' });
    this.learnCoursesLink = page.getByRole('link', { name: 'Learn Test Automation' });
  }

  productNames(): Locator {
    return this.productNameLabels;
  }

  productName(name: string): Locator {
    return this.productNameLabels.filter({ hasText: name });
  }

  async open(): Promise<void> {
    await this.goto('/');
  }

  async sortBy(optionLabel: string): Promise<void> {
    await this.sortSelect.selectOption(optionLabel);
  }

  async filterByCategory(categoryName: string): Promise<void> {
    await this.page.getByRole('checkbox', { name: categoryName, exact: true }).check();
  }

  async search(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  async productPrice(name: string): Promise<string> {
    const card = this.page.getByRole('link').filter({ has: this.page.getByRole('heading', { name, exact: true }) });
    const price = (await card.getByTestId('product-price').innerText()).trim();
    return this.applyDiscount(price);
  }


  async openProduct(name: string): Promise<void> {
    await this.page.getByRole('heading', { name, exact: true }).click();
  }

  async openFirstProduct(): Promise<void> {
    await this.productNameLabels.first().click();
  }

  async firstProductName(): Promise<string> {
    return (await this.productNameLabels.first().innerText()).trim();
  }

  async openFirstOutOfStockProduct(): Promise<void> {
    await this.outOfStockProducts.first().click();
  }
  
  private applyDiscount(price: string): string {
    const factor = 1; 

    const amount = Number(price.replace('$', ''));
    return `$${(amount * factor).toFixed(2)}`;
  }

  async openLearnCourses(): Promise<Page> {
    const popupPromise = this.page.waitForEvent('popup');
    await this.learnCoursesLink.click();
    return popupPromise;
  }
}
