// Runs the Playwright tests, then builds and opens a fresh Allure report.
// Extra arguments are passed to Playwright, e.g. `npm run test:report -- --project=firefox`.

// Run commands
const { spawnSync } = require('child_process');
// Delete folders
const fs = require('fs');

// Run, return exit code
function run(command, args) {
  return spawnSync(command, args, { stdio: 'inherit', shell: true }).status ?? 1;
}

// Clear old results
for (const dir of ['allure-results', 'allure-report']) {
  fs.rmSync(dir, { recursive: true, force: true });
}

// Block HTML auto-open
process.env.PLAYWRIGHT_HTML_OPEN = 'never';

// Run tests
const testStatus = run('npx', ['playwright', 'test', ...process.argv.slice(2)]);

// Generate report
if (run('npx', ['allure', 'generate', 'allure-results', '-o', 'allure-report']) !== 0) {
  process.exit(1);
}

// Open report
run('npx', ['allure', 'open', 'allure-report']);

// Return test result
process.exit(testStatus);
