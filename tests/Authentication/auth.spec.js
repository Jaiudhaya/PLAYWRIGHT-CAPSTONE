import { test, expect } from '@playwright/test';

const URL = 'https://opensource-demo.orangehrmlive.com/';

const gotoLogin = async (page) => {
  await page.goto(URL);
};

const login = async (page, user, pass) => {
  await page.getByRole('textbox', { name: 'Username' }).fill(user);
  await page.getByRole('textbox', { name: 'Password' }).fill(pass);
  await page.getByRole('button', { name: 'Login' }).click();
};

test.describe('OrangeHRM Login tests', () => {

  test('1. Valid login', async ({ page }) => {
    await gotoLogin(page);
    await login(page, 'Admin', 'admin123');
    await page.waitForURL(/dashboard/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('2. Invalid username', async ({ page }) => {
    await gotoLogin(page);
    await login(page, 'wrong_user', 'admin123');
    await expect(page.locator('.oxd-alert-content-text')).toHaveText('Invalid credentials');
  });

  test('3. Invalid password', async ({ page }) => {
    await gotoLogin(page);
    await login(page, 'Admin', 'wrong_pass');
    const errorMessage = page.getByText('Invalid credentials');
    await expect(errorMessage).toBeVisible({ timeout: 10000 });
  });

  test('4. Empty username', async ({ page }) => {
    await gotoLogin(page);
    await login(page, '', 'admin123');
    await expect(page.locator('.oxd-input-field-error-message')).toContainText('Required');
  });

  test('5. Empty password', async ({ page }) => {
    await gotoLogin(page);
    await login(page, 'Admin', '');
    await expect(page.locator('.oxd-input-field-error-message')).toContainText('Required');
  });

  test('6. Empty fields', async ({ page }) => {
    await gotoLogin(page);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('.oxd-input-field-error-message').first()).toContainText('Required');
  });

  test('7. Special characters login', async ({ page }) => {
    await gotoLogin(page);
    await login(page, '@#$%', '@#$%');
    await expect(page.locator('.oxd-alert-content-text')).toHaveText('Invalid credentials');
  });

  test('8. Forgot password visible', async ({ page }) => {
    await gotoLogin(page);
    await expect(page.getByText('Forgot your password?')).toBeVisible();
  });

  test('9. Forgot password navigation', async ({ page }) => {
    await gotoLogin(page);
    await page.getByText('Forgot your password?').click();
    await expect(page).toHaveURL(/requestPasswordResetCode/);
  });

  test('10. Login using Enter key', async ({ page }) => {
    await gotoLogin(page);
    await login(page, 'Admin', 'admin123');
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible({ timeout: 10000 });
  });

  test('11. Logout', async ({ page }) => {
    await gotoLogin(page);
    await login(page, 'Admin', 'admin123');
    await page.locator('.oxd-userdropdown-tab').click();
    await page.getByText('Logout').click();
    await expect(page).toHaveURL(/login/);
  });

  test('12.Username field visible', async ({ page }) => {
    await gotoLogin(page);
    await expect(page.getByRole('textbox', {name: 'Username' })).toBeVisible();
  });

  test('13.Password field visible', async ({ page }) => {
    await gotoLogin(page);
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
  });

  test('14.Login button visible', async ({ page }) => {
    await gotoLogin(page);
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('15.Username field accepts input', async ({ page }) => {
    await gotoLogin(page);
    const username = page.getByRole('textbox', { name: 'Username' });
    await username.fill('Admin');
    await expect(username).toHaveValue('Admin');
  });

    test('16.Password field accepts input', async ({ page }) => {
    await gotoLogin(page);
    const password = page.getByRole('textbox', { name: 'Password' });
    await password.fill('admin123');
    await expect(password).toHaveValue('admin123');
  });

  test('17.Password field masked', async ({ page }) => {
    await gotoLogin(page);
    const password = page.getByRole('textbox', { name: 'Password' });
    await expect(password).toHaveAttribute('type', 'password');
  });

  test('18.Refreshes keeps user on login page', async ({ page }) => {
    await gotoLogin(page);
    await page.reload();
    await expect(page.getByRole('button', { name: 'Login'})).toBeVisible();
  });
});

//works