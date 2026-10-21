import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly loginUrl = /\/auth\/login/;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly loginErrorMessage: Locator;
  private readonly emailErrorMessage: Locator;
  private readonly passwordErrorMessage: Locator;

  constructor(page: Page) {
    super(page);
    // getByLabel('Password') also matches the "Forgot your Password?" link, so use the textbox role.
    this.emailInput = page.getByRole('textbox', { name: 'Email address' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.loginErrorMessage = page.getByTestId('login-error');
    this.emailErrorMessage = page.getByTestId('email-error');
    this.passwordErrorMessage = page.getByTestId('password-error');
  }

  urlPattern(): RegExp {
    return this.loginUrl;
  }

  loginError(): Locator {
    return this.loginErrorMessage;
  }

  emailError(): Locator {
    return this.emailErrorMessage;
  }

  passwordError(): Locator {
    return this.passwordErrorMessage;
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submit();
  }

  async submit(): Promise<void> {
    await this.loginButton.click();
  }
}
