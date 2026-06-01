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

        // ✅ stable dashboard verification
        await expect(dashboardPage.sidebar).toBeVisible({ timeout: 15000 });
    });

    // test('1. Verify Dashboard loaded', async () => {
    //     await expect(await dashboardPage.isDashboardLoaded()).toBeTruthy();
    // });

    // test('2. Verify sidebar visible', async () => {
    //     await expect(dashboardPage.sidebar).toBeVisible();
    // });

    test('3. Verify Admin menu visible', async () => {
        await expect(dashboardPage.adminMenu).toBeVisible();
    });

    // test('4. Verify Admin navigation', async ({ page }) => {
    //     await dashboardPage.clickMenu(dashboardPage.adminMenu);
    //     await expect(page).toHaveURL(/admin/);
    // });

    test('5. Verify Leave menu visible', async () => {
        await expect(dashboardPage.leaveMenu).toBeVisible();
    });

    test('6. Verify Leave navigation', async ({ page }) => {
        await dashboardPage.clickMenu(dashboardPage.leaveMenu);
        await expect(page).toHaveURL(/leave/);
    });

    test('7. Verify Directory menu visible', async () => {
        await expect(dashboardPage.directoryMenu).toBeVisible();
    });

    test('8. Verify Directory navigation', async ({ page }) => {
        await dashboardPage.clickMenu(dashboardPage.directoryMenu);
        await expect(page).toHaveURL(/directory/);
    });

    test('9. Verify Recruitment navigation', async ({ page }) => {
        await dashboardPage.clickMenu(dashboardPage.recruitmentMenu);
        await expect(page).toHaveURL(/recruitment/);
    });

    test('10. Verify search box visible', async () => {
        await expect(dashboardPage.searchBox).toBeVisible();
    });

    test('11. Verify search enabled', async () => {
        await expect(dashboardPage.searchBox).toBeEnabled();
    });

    test('12. Verify search input', async () => {
        await dashboardPage.searchBox.fill('Admin');
        await expect(dashboardPage.searchBox).toHaveValue('Admin');
    });

    test('13. Verify search clear', async () => {
        await dashboardPage.searchBox.fill('PIM');
        await dashboardPage.searchBox.clear();
        await expect(dashboardPage.searchBox).toHaveValue('');
    });

    test('14. Verify search placeholder', async () => {
        await expect(dashboardPage.searchBox).toHaveAttribute('placeholder', 'Search');
    });

    test('15. Verify refresh keeps session', async ({ page }) => {
        await page.reload();
        await expect(dashboardPage.sidebar).toBeVisible();
    });
});