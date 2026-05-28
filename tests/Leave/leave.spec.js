import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages/loginPage';
import { DashboardPage } from '../../Pages/dashboardPage';
import { LeavePage } from '../../Pages/leavePage';

test.describe.configure({ mode: 'serial' });

test.describe('Leave Module Tests', () => {
    let page;
    let loginPage;
    let dashboardPage;
    let leavePage;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        leavePage = new LeavePage(page);
        await loginPage.gotoLoginPage();
        await loginPage.login('Admin','admin123');
        await dashboardPage.leaveMenu.click();
        await expect(leavePage.leaveHeading).toBeVisible();
    });

    test.afterAll(async () => {
        await page.close();
    });

    test('1.Verify Leave heading', async () => {
        await expect(leavePage.leaveHeading).toContainText('Leave');
    });

    test('2.Verify Apply button visible', async () => {
        await expect(leavePage.applyButton).toBeVisible();
    });

    test('3.Verify Leave List tab visible', async () => {
        await expect(leavePage.leaveListTab).toBeVisible();
    });


    test('4.Verify Reports tab visible', async () => {
        await expect(leavePage.reportsTab).toBeVisible();
    });

    test('5.Verify Configure tab visible', async () => {
        await expect(leavePage.configureTab).toBeVisible();
    });

    test('6.Verify employee name field visible', async () => {
        await expect(leavePage.employeeNameInput).toBeVisible();
    });

    test('7.Verify from date field visible', async () => {
        await expect(leavePage.fromDateInput).toBeVisible();
    });

    test('8.Verify to date field visible', async () => {
        await expect(leavePage.toDateInput).toBeVisible();
    });

    test('9.Verify search button visible', async () => {
        await expect(leavePage.searchButton).toBeVisible();
    });

    test('10.Verify reset button visible', async () => {
        await expect(leavePage.resetButton).toBeVisible();
    });

    test('11.Verify table visible', async () => {
        await expect(leavePage.table).toBeVisible();
    });

    test('12.Verify employee name accepts input', async () => {
        await leavePage.employeeNameInput.fill('Admin');
        await expect(leavePage.employeeNameInput).toHaveValue('Admin');
    });

    test('13.Verify from date accepts input', async () => {
        await leavePage.fromDateInput.fill('2025-01-01');
        await expect(leavePage.fromDateInput).toHaveValue('2025-01-01');
    });

    test('14.Verify to date accepts input', async () => {
        await leavePage.toDateInput.fill('2025-12-31');
        await expect(leavePage.toDateInput).not.toHaveValue('');
    });

    test('15.Verify reset button functionality', async () => {
        await leavePage.employeeNameInput.fill('Admin');
        await leavePage.resetButton.click();
        await expect(leavePage.resetButton).toBeVisible();
    });

    test('16.Verify search button enabled', async () => {
        await expect(leavePage.searchButton).toBeEnabled();
    });

    test('17.Verify reset button enabled', async () => {
        await expect(leavePage.resetButton).toBeEnabled();
    });

    test('18.Verify Leave navigation URL', async () => {
        await expect(page).toHaveURL(/leave/);
    });

    test('19.Verify Apply tab navigation', async () => {
        await leavePage.applyButton.click();
        await expect(page).toHaveURL(/applyLeave/);
        await page.goBack();
    });

    test('20.Verify page refresh keeps session', async () => {
        await page.reload();
        await expect(leavePage.leaveHeading).toBeVisible();
    });
});

//works