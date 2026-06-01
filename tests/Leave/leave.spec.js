import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages/loginPage';
import { DashboardPage } from '../../Pages/dashboardPage';
import { LeavePage } from '../../Pages/leavePage';

test.describe('Leave Module Functionality Tests', () => {
    let page;
    let context;
    let loginPage;
    let dashboardPage;
    let leavePage;

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        leavePage = new LeavePage(page);
        await loginPage.gotoLoginPage();
        await loginPage.login('Admin', 'admin123');
        await dashboardPage.leaveMenu.click();
        //await expect(leavePage.leaveHeading).toBeVisible();
        await expect(page).toHaveURL(/leave/);
    });

    test.afterAll(async () => {
        await context.close();
    });

    test('1.Verify Leave module opens', async () => {
        await expect(page).toHaveURL(/leave/);
    });

    test('2.Verify Apply page opens', async ({ page }) => {
        await leavePage.applyTab.click();
        await page.waitForURL(/applyLeave/, {timeout: 30000});
        await expect(page).toHaveURL(/applyLeave/);
    });

    test('3.Verify Comment field accepts input', async () => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/leave/applyLeave');
        await expect(leavePage.commentTextarea).toBeVisible();
        await leavePage.commentTextarea.fill('Leave Comment');
        await expect(leavePage.commentTextarea).toHaveValue('Leave Comment');
    });

    test('4.Verify My Leave page opens', async () => {
        await leavePage.myLeaveTab.click();
        await page.waitForURL(/viewMyLeaveList/,{ timeout: 10000 });
        //await expect(page).toHaveURL(/viewMyLeaveList/);
    });

    test('5.Verify From Date field editable', async () => {
        await leavePage.dateInputs.first().fill('2026-01-01');
        await expect(leavePage.dateInputs.first()).toHaveValue('2026-01-01');
    });

    test('6.Verify To Date field editable', async () => {
        await leavePage.dateInputs.nth(1).fill('2026-01-05');
        await expect(leavePage.dateInputs.nth(1)).toHaveValue('2026-01-05');
    });

    test('7.Verify Search button clickable', async () => {
        await leavePage.myLeaveTab.click();
        await expect(page).toHaveURL(/viewMyLeaveList/);
        await leavePage.searchButton.click();
        await expect(leavePage.searchButton).toBeEnabled();
    });

    test('8.Verify Reset button clickable', async () => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewMyLeaveList');
        await leavePage.resetButton.click();
        await expect(page).toHaveURL(/viewMyLeaveList/);
    });

    test('9.Verify Leave List page opens', async () => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewLeaveList');
        await expect(page).toHaveURL(/viewLeaveList/);
    });

    test('10.Verify Employee Name accepts input', async () => {
        await leavePage.employeeInput.fill('Admin');
        await expect(leavePage.employeeInput).toHaveValue('Admin');
    });

    test('11.Verify Status dropdown clickable', async () => {
        await leavePage.dropdowns.first().click();
        await expect(leavePage.dropdownOptions.first()).toBeVisible();
    });

    test('12.Verify Sub Unit dropdown clickable', async () => {
        await leavePage.dropdowns.nth(1).click();
        await expect(leavePage.dropdownOptions.first()).toBeVisible();
    });

    test('13.Verify Assign Leave page opens', async () => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/leave/assignLeave');
        await expect(page).toHaveURL(/assignLeave/);
    });

    test('14.Verify Assign Leave comment field editable', async () => {
        await leavePage.commentTextarea.fill('Assign leave note');
        await expect(leavePage.commentTextarea).toHaveValue('Assign leave note');
    });

    test('15.Verify page refresh keeps session', async () => {
        await page.reload();
        await expect(leavePage.leaveHeading).toBeVisible();
    });
});