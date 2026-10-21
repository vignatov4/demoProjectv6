import { test, expect } from '../fixtures/pages';

test.describe('Footer', () => {
  test('"Learn Test Automation" opens the courses site in a new tab', async ({ homePage }) => {
    await homePage.open();

    const coursesPage = await homePage.openLearnCourses();

    await expect(coursesPage).toHaveURL(/onlinecourses\.testsmith\.io/);
  });
});
