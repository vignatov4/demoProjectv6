# demoProjectv6

End-to-end UI tests for the demo shop [practicesoftwaretesting.com](https://practicesoftwaretesting.com), written with [Playwright](https://playwright.dev) and TypeScript, with [Allure](https://allurereport.org) reporting.

## What is tested

| Spec | Covers |
|---|---|
| `tests/catalog.spec.ts` | Product grid, category filter, search, product details, out-of-stock label |
| `tests/login.spec.ts` | Customer login and account page |
| `tests/cart.spec.ts` | Logged-in customer adds a product and sees it in the cart at the catalog price |
| `tests/footer.spec.ts` | Footer link opens the courses site in a new tab |

## Requirements

- [Node.js](https://nodejs.org) (LTS)
- No Java needed: the project uses Allure 3, which runs on Node.

## Setup

```bash
npm install
npx playwright install
```

## Running tests

```bash
npm test                                   # all tests, headless
npx playwright test tests/login.spec.ts    # one file
npx playwright test --headed               # watch the browser
npx playwright test --ui                   # interactive UI mode
npx playwright test --reporter=dot         # compact terminal output
```

Tests run in Chromium. Firefox and WebKit projects are in `playwright.config.ts` but commented out; uncomment them to run with `--project=firefox` or `--project=webkit`.

## Reports

**One command: run tests and open an Allure report**

```bash
npm run test:report
npm run test:report -- tests/catalog.spec.ts   # extra arguments go to Playwright
```

This clears old results, runs the tests, builds the Allure report (even if tests fail) and opens it in the browser. Press `Ctrl+C` to stop it.

**Step by step**

```bash
npm test                    # writes allure-results/ and playwright-report/
npm run allure:generate     # builds allure-report/
npm run allure:open         # opens it
npx playwright show-report  # opens the Playwright HTML report
```

On failure, a screenshot and a trace are attached to the test in both reports. Open a trace with:

```bash
npx playwright show-trace test-results/<test-folder>/trace.zip
```

## Project structure

```
pages/            Page objects (BasePage + one class per page)
fixtures/pages.ts Custom `test` that injects page objects (homePage, loginPage, ...)
test-data/        Demo accounts and other test data
tests/            Spec files
scripts/          test-report.js: one-command test run + Allure report
.github/workflows CI: runs the tests on every push and pull request to main
```

Tests import `test` and `expect` from `fixtures/pages` instead of `@playwright/test`, so page objects are available as fixtures:

```ts
import { test, expect } from '../fixtures/pages';

test('customer can log in', async ({ loginPage, accountPage }) => {
  // ...
});
```

## Test accounts

Public demo accounts from the site, defined in `test-data/users.ts`:

| Export | Role | Email | Password |
|---|---|---|---|
| `admin` | admin | admin@practicesoftwaretesting.com | welcome01 |
| `customer` | user | customer@practicesoftwaretesting.com | welcome01 |
| `customer2` | user | customer2@practicesoftwaretesting.com | welcome01 |
| `customer3` | user | customer3@practicesoftwaretesting.com | pass123 |

These are shared demo credentials. Do not put real credentials in this repository.

## CI

GitHub Actions (`.github/workflows/playwright.yml`) runs the tests on every push and pull request to `main`, and uploads the Playwright HTML report as a build artifact (kept 30 days).
