import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages/loginPage';
import { DashboardPage } from '../../Pages/dashboardPage';
import { TimePage } from '../../Pages/timePage';

test.describe.configure({ mode: 'serial' });

test.describe('Time Module Tests', () => {
    let page;
    let context;
    let loginPage;
    let dashboardPage;
    let timePage;

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        timePage = new TimePage(page);
        await loginPage.gotoLoginPage();
        await loginPage.login('Admin', 'admin123');
        await dashboardPage.timeMenu.click();
        await expect(page).toHaveURL(/time/);
    });

    test.afterAll(async () => {
        await context.close();
    });

    test('1.Verify Timesheets tab navigation', async () => {
        await timePage.timesheetsTab.click();
    });

    test('2.Verify Attendance tab navigation', async () => {
        await timePage.attendanceTab.click();
    });

    test('3.Verify Reports tab navigation', async () => {
        await timePage.reportsTab.click();
    });

    test('4.Verify Employee Name accepts input', async () => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/time/viewEmployeeTimesheet');
        await timePage.employeeNameInput.fill('John');
        await expect(timePage.employeeNameInput).toHaveValue('John');
    });

    test('5.Verify Employee Timesheet validation', async () => {
        await timePage.viewButton.click();
        await expect(timePage.requiredMessage).toBeVisible();
    });

    test('6.Verify Timesheet page refresh', async () => {
        await page.reload();
        await expect(page).toHaveURL(/viewEmployeeTimesheet/);
    });

    test('7.Verify My Timesheet navigation', async () => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/time/viewMyTimesheet');
        await expect(page).toHaveURL(/viewMyTimesheet/);
    });

    test('8.Verify Employee Timesheet navigation', async () => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/time/viewEmployeeTimesheet');
        await expect(page).toHaveURL(/viewEmployeeTimesheet/);
    });

    test('9.Verify Project Report page navigation', async () => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/time/displayProjectReportCriteria');
        await expect(page).toHaveURL(/displayProjectReportCriteria/);
    });

    test('10.Verify Employee Report page navigation', async () => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/time/displayEmployeeReportCriteria');
        await expect(page).toHaveURL(/displayEmployeeReportCriteria/);
    });

    test('11.Verify Attendance Summary page navigation', async () => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/time/displayAttendanceSummaryReportCriteria');
        await expect(page).toHaveURL(/displayAttendanceSummaryReportCriteria/);
    });

    test('12.Verify Attendance Summary employee input', async () => {
        await timePage.employeeNameInput.fill('John');
        await expect(timePage.employeeNameInput).toHaveValue('John');
    });

    test('13.Verify Job Title dropdown selection', async () => {
        await timePage.jobTitleDropdown.click();
        await timePage.dropdownOptions.nth(1).click();
        await expect(timePage.jobTitleDropdown).not.toContainText('-- Select --');
    });

    test('14.Verify Sub Unit dropdown selection', async () => {
        await timePage.subUnitDropdown.click();
        await timePage.dropdownOptions.nth(1).click();
        await expect(timePage.subUnitDropdown).not.toContainText('-- Select --');
    });

    test('15.Verify Project Name input accepts value', async () => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/time/displayProjectReportCriteria');
        await timePage.projectNameInput.fill('Apache');
        await expect(timePage.projectNameInput).toHaveValue('Apache');
    });

    test('16.Verify Time module session after refresh', async () => {
        await page.reload();
        await expect(timePage.timeHeading).toBeVisible();
    });

});

//WORKS!!