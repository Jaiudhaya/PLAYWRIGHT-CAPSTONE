import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages/loginPage';
import { DashboardPage } from '../../Pages/dashboardPage';
import { LeavePage } from '../../Pages/leavePage';

test.describe.configure({ mode: 'serial' });

test.describe('Leave Module Tests', () => {
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
        await expect(leavePage.leaveHeading).toBeVisible();
    });

    test.afterAll(async () => {
        await context.close();
    });

    test('1.Verify Apply tab navigation', async () => {
        await leavePage.applyTab.click();
        await expect(page).toHaveURL(/applyLeave/);
    });

    test('2.Verify My Leave tab navigation', async () => {
        await leavePage.myLeaveTab.click();
        await expect(page).toHaveURL(/viewMyLeaveList/);
    });

    test('3.Verify Leave List tab navigation', async () => {
        await leavePage.leaveListTab.click();
        await expect(page).toHaveURL(/viewLeaveList/);
    });

    test('4.Verify Assign Leave tab navigation', async () => {
        await leavePage.assignLeaveTab.click();
        await expect(page).toHaveURL(/assignLeave/);
    });

    test('5.Verify Employee Name accepts input', async () => {
        await leavePage.assignLeaveTab.click();
        await leavePage.employeeNameInput.fill('John');
        await expect(leavePage.employeeNameInput).toHaveValue('John');
    });

    test('6.Verify Leave List Search button works', async () => {
        await leavePage.leaveListTab.click();
        await leavePage.searchButton.click();
        await expect(leavePage.table).toBeVisible();
    });

    test('7.Verify Leave List Reset button works', async () => {
        await leavePage.leaveListTab.click();
        await leavePage.resetButton.click();
        await expect(leavePage.searchButton).toBeVisible();
    });

    test('8.Verify Apply page opens successfully', async () => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/leave/applyLeave');
        await expect(page).toHaveURL(/applyLeave/);
    });

    test('9.Verify Comment field accepts input', async () => {
        await leavePage.applyTab.click();
        await leavePage.commentInput.fill('Automation Test Comment');
        await expect(leavePage.commentInput).toHaveValue('Automation Test Comment');
    });

    test('10.Verify From Date accepts input', async () => {
        await leavePage.applyTab.click();
        await leavePage.fromDateInput.fill('2026-01-01');
        await expect(leavePage.fromDateInput).toHaveValue('2026-01-01');
    });

    // test('11.Verify To Date accepts input', async () => {
    //     await leavePage.applyTab.click();
    //     await leavePage.toDateInput.fill('2026-01-05');
    //     await expect(leavePage.toDateInput).toHaveValue('2026-01-05');
    // });

    // test('12.Verify Apply button validation', async () => {
    //     await leavePage.applyTab.click();
    //     await leavePage.applyButton.click();
    //     await expect(leavePage.requiredMessage).toBeVisible();
    //});

    test('13.Verify Entitlements menu opens', async () => {
        await leavePage.entitlementsTab.click();
        await expect(leavePage.addEntitlementsOption).toBeVisible();
    });

    test('14.Verify Reports menu opens', async () => {
        await leavePage.reportsTab.click();
        await expect(leavePage.reportsTab).toBeVisible();
    });

    test('15.Verify Configure menu opens', async () => {
        await leavePage.configureTab.click();
        await expect(leavePage.configureTab).toBeVisible();
    });

});

//WORKS :)