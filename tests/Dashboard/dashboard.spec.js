const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../Pages/loginPage');
const { DashboardPage } = require('../../Pages/dashboardPage');

test.describe('Dashboard Module Tests', () => {
    let loginPage;
    let dashboardPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        await loginPage.gotoLoginPage();
        await loginPage.login('Admin', 'admin123');
        await expect(dashboardPage.sidebar).toBeVisible({ timeout: 15000 });
    });

    test('1. Verify Admin menu visible', async () => {
        await expect(dashboardPage.adminMenu).toBeVisible();
    });

    test('2. Verify Leave menu visible', async () => {
        await expect(dashboardPage.leaveMenu).toBeVisible();
    });

    test('3. Verify Leave navigation', async ({ page }) => {
        await dashboardPage.clickMenu(dashboardPage.leaveMenu);
        await expect(page).toHaveURL(/leave/);
    });

    test('4. Verify Directory menu visible', async () => {
        await expect(dashboardPage.directoryMenu).toBeVisible();
    });

    test('5. Verify Directory navigation', async ({ page }) => {
        await dashboardPage.clickMenu(dashboardPage.directoryMenu);
        await expect(page).toHaveURL(/directory/);
    });

    test('6. Verify Recruitment navigation', async ({ page }) => {
        await dashboardPage.clickMenu(dashboardPage.recruitmentMenu);
        await expect(page).toHaveURL(/recruitment/);
    });

    test('7. Verify search box visible', async () => {
        await expect(dashboardPage.searchBox).toBeVisible();
    });

    test('8. Verify search enabled', async () => {
        await expect(dashboardPage.searchBox).toBeEnabled();
    });

    test('9. Verify search input', async () => {
        await dashboardPage.searchBox.fill('Admin');
        await expect(dashboardPage.searchBox).toHaveValue('Admin');
    });

    test('10. Verify search clear', async () => {
        await dashboardPage.searchBox.fill('PIM');
        await dashboardPage.searchBox.clear();
        await expect(dashboardPage.searchBox).toHaveValue('');
    });

    test('11. Verify search placeholder', async () => {
        await expect(dashboardPage.searchBox).toHaveAttribute('placeholder', 'Search');
    });

    test('12. Verify refresh keeps session', async ({ page }) => {
        await page.reload();
        await expect(dashboardPage.sidebar).toBeVisible();
    });
});