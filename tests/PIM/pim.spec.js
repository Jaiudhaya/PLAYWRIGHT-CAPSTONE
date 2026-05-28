import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages/loginPage';
import { DashboardPage } from '../../Pages/dashboardPage';
import { PimPage } from '../../Pages/pimPage';

test.describe.configure({ mode: 'serial' });

test.describe('PIM Module Tests', () => {
    let page;
    let context;
    let loginPage;
    let dashboardPage;
    let pimPage;

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        pimPage = new PimPage(page);
        await loginPage.gotoLoginPage();
        await loginPage.login('Admin', 'admin123');
        await dashboardPage.pimMenu.click();
        await expect(pimPage.pimHeading).toBeVisible();
    });

    test.afterAll(async () => {
        await context.close();
    });

    test('1.Verify PIM Heading', async () => {
        await expect(pimPage.pimHeading).toContainText('PIM');
    });

    test('2.Verify Add employee button visible', async () => {
        await expect(pimPage.addEmployeeButton).toBeVisible();
    });

    test('3.Verify employee name input visible', async () => {
        await expect(pimPage.employeeNameInput).toBeVisible();
    });

    test('4.Verify employee ID input visible', async () => {
        await expect(pimPage.employeeIdInput).toBeVisible();
    });

    test('5.Verify search button visible', async () => {
        await expect(pimPage.searchButton).toBeVisible();
    });

    test('6.Verify reset button visible', async () => {
        await expect(pimPage.resetButton).toBeVisible();
    });

    test('7.Verify employee list table visible', async () => {
        await expect(pimPage.employeeListTable).toBeVisible();
    });

    test('8.Verify records found text visible', async () => {
        await expect(pimPage.recordsFoundText).toBeVisible();
    });

    test('9.Verify PIM URL', async () => {
        await expect(page).toHaveURL(/pim/);
    });

    test('10.Verify employee name accepts input', async () => {
        await pimPage.employeeNameInput.fill('John');
        await expect(pimPage.employeeNameInput).toHaveValue('John');
    });

    test('11.Verify employee ID accepts input', async () => {
        await pimPage.employeeIdInput.fill('1234');
        await expect(pimPage.employeeIdInput).toHaveValue('1234');
    });

    test('12.Verify reset button visible after click', async () => {
        await pimPage.employeeNameInput.fill('Admin');
        await pimPage.resetButton.click();
        await expect(pimPage.resetButton).toBeVisible();
    });

    test('13.Verify Add Employee navigation', async () => {
        await pimPage.addEmployeeButton.click();
        await expect(page).toHaveURL(/addEmployee/);
        await page.goBack();
    });

    test('14.Verify reset button clickable', async () => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList');
        await expect(pimPage.resetButton).toBeEnabled();
    });

    test('15.Verify page refresh keeps session', async () => {
        await page.reload();
        await expect(pimPage.pimHeading).toBeVisible();
    });

    test('16.Verify Add Employee page opens', async () => {
        await pimPage.addEmployeeButton.click();
        await expect(page).toHaveURL(/addEmployee/);
        await page.goBack();
    });
});

//works