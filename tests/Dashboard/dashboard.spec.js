import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages/loginPage';
import { DashboardPage } from '../../Pages/dashboardPage';

test.describe.configure({ mode: 'serial' });

test.describe('Dashboard Module Tests', () => {
    let loginPage;
    let dashboardPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        await loginPage.gotoLoginPage();
        await loginPage.login('Admin', 'admin123');
        await expect(dashboardPage.dashboardHeading).toBeVisible({ timeout: 15000 });
    });

    test('1.Verify Dashboard heading', async () => {
        await expect(dashboardPage.dashboardHeading).toContainText('Dashboard');
    });

    test('2.Verify sidebar visible', async () => {
        await expect(dashboardPage.sidebar).toBeVisible();
    });

    test('3.Verify user dropdown visible', async () => {
        await expect(dashboardPage.userDropdown).toBeVisible();
    });

    test('4.Verify Admin menu visible', async () => {
        await expect(dashboardPage.adminMenu).toBeVisible();
    })

    test('5.Verify Admin navigation', async ({ page }) => {
        await dashboardPage.adminMenu.click();
        await expect(page).toHaveURL(/admin/);
    });

    test('6.Verify Leave menu visible', async () => {
        await expect(dashboardPage.leaveMenu).toBeVisible();
    })

    test('7.Verify Leave navigation', async ({ page }) => {
        await dashboardPage.leaveMenu.click();
        await expect(page).toHaveURL(/leave/);
    });

    test('8.Verify Directory menu visible', async () => {
        await expect(dashboardPage.directoryMenu).toBeVisible();
    })

    test('9.Verify Directory navigation', async ({ page }) => {
        await dashboardPage.directoryMenu.click();
        await expect(page).toHaveURL(/directory/);
    });

    test('10.Verify recruitment menu visible', async () => {
        await expect(dashboardPage.recruitmentMenu).toBeVisible();
    })

    test('11.Verify Recruitment navigation', async ({ page }) => {
        await dashboardPage.recruitmentMenu.click();
        await expect(page).toHaveURL(/recruitment/);
    });

    test('12.Verify dashboard menu visible', async () => {
        await expect(dashboardPage.dashboardMenu).toBeVisible();
    });

    test('13.Verify search box visible', async () => {
        await expect(dashboardPage.searchBox).toBeVisible();
    });

    test('14.Verify search box is enables', async () => {
        await expect(dashboardPage.searchBox).toBeEnabled();
    })

    test('15.Verify refresh keeps session', async ({ page }) => {
        await page.reload();
        await expect(dashboardPage.dashboardHeading).toBeVisible();
    });

    test('16.Verify dashboard fully loads', async () => {
        await expect(dashboardPage.dashboardHeading).toBeVisible();
    });

    test('17.Verify search box is enabled', async () => {
        await expect(dashboardPage.searchBox).toBeEnabled();
    })

    test('18.Verify search accepts input', async () => {
        await dashboardPage.searchBox.fill('Admin');
        await expect(dashboardPage.searchBox).toHaveValue('Admin');
    });

    test('19.Verify search clear', async () => {
        await dashboardPage.searchBox.fill('PIM');
        await dashboardPage.searchBox.clear();
        await expect(dashboardPage.searchBox).toHaveValue('');
    });

    // test('20.Verify search box placeholder', async () => {
    //     await expect(dashboardPage.searchBox).toHaveAttribute('placeholder', 'Search');
    // })
});

//works