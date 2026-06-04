const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../Pages/loginPage');
const { DashboardPage } = require('../../Pages/dashboardPage');
const { AdminPage } = require('../../Pages/AdminPage');

let loginPage;
let dashboardPage;
let adminPage;

test.describe('Admin Functional Tests', () => {

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        adminPage = new AdminPage(page);
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await loginPage.login('Admin', 'admin123');
        await dashboardPage.adminMenu.click();
        await expect(page).toHaveURL(/admin/);
    });

        test('1.Search user by username', async () => {
            await adminPage.usernameInput.fill('Admin');
            await adminPage.searchButton.click();
            await expect(adminPage.table).toContainText('Admin');
        });

        test('2.Reset clears username field', async () => {
            await adminPage.usernameInput.fill('Admin');
            await adminPage.resetButton.click();
            await expect(adminPage.usernameInput).toHaveValue('');
        });

        test('3.Filter by User Role', async () => {
            await adminPage.userRoleDropdown.click();
            await adminPage.dropdownOptions.filter({ hasText: 'Admin' }).click();
            await adminPage.searchButton.click();
            await expect(adminPage.table).toBeVisible();
        });

        test('4.Filter by Status', async () => {
            await adminPage.statusDropdown.click();
            await adminPage.dropdownOptions.filter({ hasText: 'Enabled' }).click();
            await adminPage.searchButton.click();
            await expect(adminPage.table).toBeVisible();
        });

        test('5.Search using Employee Name', async ({ page }) => {
            await adminPage.employeeNameInput.fill('a');
            await page.waitForTimeout(1000);
            await page.keyboard.press('ArrowDown');
            await page.keyboard.press('Enter');
            await adminPage.searchButton.click();
            await expect(adminPage.table).toBeVisible();
        });

        // test('6.Open Add User page', async () => {
        //     await adminPage.addButton.click();
        //     await expect(adminPage.saveButton).toBeVisible();
        // });

        test('7.Add User form validation', async () => {
            await adminPage.addButton.click();
            await adminPage.saveButton.click();
            await expect(adminPage.requiredMessage.first()).toBeVisible();
        });

        test('8.User Role selection works', async () => {
            await adminPage.addButton.click();
            await adminPage.addUserRoleDropdown.click();
            await adminPage.dropdownOptions.nth(1).click();
            await expect(adminPage.addUserRoleDropdown).not.toContainText('-- Select --');
        });

        test('9.Status selection works', async () => {
            await adminPage.addButton.click();
            await adminPage.addStatusDropdown.click();
            await adminPage.dropdownOptions.nth(1).click();
            await expect(adminPage.addStatusDropdown).not.toContainText('-- Select --');
        });

        test('10.Password field accepts input', async () => {
            await adminPage.addButton.click();
            await adminPage.passwordInput.fill('Password123');
            await expect(adminPage.passwordInput).toHaveValue('Password123');
        });

        test('11.Confirm password accepts input', async () => {
            await adminPage.addButton.click();
            await adminPage.confirmPasswordInput.fill('Password123');
            await expect(adminPage.confirmPasswordInput).toHaveValue('Password123');
        });

        test('12.Username field accepts input in Add User', async () => {
            await adminPage.addButton.click();
            await adminPage.addUsernameInput.fill('TestUser');
            await expect(adminPage.addUsernameInput).toHaveValue('TestUser');
        });

        test('13.Cancel Add User operation', async ({ page }) => {
            await adminPage.addButton.click();
            await adminPage.cancelButton.click();
            await page.waitForURL(/viewSystemUsers/, {timeout: 15000});
            await expect(adminPage.table).toBeVisible({ timeout: 15000 });
        });

        test('14.Search after entering multiple filters', async () => {
            await adminPage.usernameInput.fill('Admin');
            await adminPage.searchButton.click();
            await expect(adminPage.table).toContainText('Admin');
        });
    });

// WORKS :)