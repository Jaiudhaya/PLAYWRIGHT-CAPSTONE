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

    test('1.Verify employee name accepts input', async () => {
        await pimPage.employeeNameInput.fill('John');
        await expect(pimPage.employeeNameInput).toHaveValue('John');
    });

    test('2.Verify employee ID accepts input', async () => {
        await pimPage.employeeIdInput.fill('1234');
        await expect(pimPage.employeeIdInput).toHaveValue('1234');
    });

    test('3.Verify reset button visible after click', async () => {
        await pimPage.employeeNameInput.fill('Admin');
        await pimPage.resetButton.click();
        await expect(pimPage.resetButton).toBeVisible();
    });

    test('4.Verify Add Employee navigation', async () => {
        await pimPage.addEmployeeButton.click();
        await expect(page).toHaveURL(/addEmployee/);
        await page.goBack();
    });

    test('5.Verify reset button clickable', async () => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList');
        await expect(pimPage.resetButton).toBeEnabled();
    });

    test('6.Verify page refresh keeps session', async () => {
        await page.reload();
        await expect(pimPage.pimHeading).toBeVisible();
    });

    test('7.Verify Add Employee page opens', async () => {
        await pimPage.addEmployeeButton.click();
        await expect(page).toHaveURL(/addEmployee/);
        await page.goBack();
    });

    test('8.Verify Add Employee mandatory validation', async () => {
        await pimPage.addEmployeeButton.click();
        await pimPage.saveButton.click();
        await expect(pimPage.requiredMessage).toBeVisible();
        await pimPage.cancelButton.click();
    });

    test('9.Verify First Name accepts input', async () => {
        await pimPage.addEmployeeButton.click();
        await pimPage.firstNameInput.fill('John');
        await expect(pimPage.firstNameInput).toHaveValue('John');
        await pimPage.cancelButton.click();
    });

    test('10.Verify Last Name accepts input', async () => {
        await pimPage.addEmployeeButton.click();
        await pimPage.lastNameInput.fill('Smith');
        await expect(pimPage.lastNameInput).toHaveValue('Smith');
        await pimPage.cancelButton.click();
    });

    test('11.Verify Middle Name accepts input', async () => {
        await pimPage.addEmployeeButton.click();
        await pimPage.middleNameInput.fill('Michael');
        await expect(pimPage.middleNameInput).toHaveValue('Michael');
        await pimPage.cancelButton.click();
    });

    test('12.Verify Create Login Details toggle', async () => {
        await pimPage.addEmployeeButton.click();
        await pimPage.createLoginDetailsToggle.click();
        await expect(pimPage.usernameAddInput).toBeVisible();
        await pimPage.cancelButton.click();
    });

    test('13.Verify Login Username accepts input', async () => {
        await pimPage.addEmployeeButton.click();
        await pimPage.createLoginDetailsToggle.click();
        await pimPage.usernameAddInput.fill('testuser123');
        await expect(pimPage.usernameAddInput).toHaveValue('testuser123');
        await pimPage.cancelButton.click();
    });

    test('14.Verify Password fields accept input', async () => {
        await pimPage.addEmployeeButton.click();
        await pimPage.createLoginDetailsToggle.click();
        await pimPage.passwordAddInput.fill('Password123');
        await pimPage.confirmPasswordAddInput.fill('Password123');
        await expect(pimPage.passwordAddInput).toHaveValue('Password123');
        await expect(pimPage.confirmPasswordAddInput).toHaveValue('Password123');
        await pimPage.cancelButton.click();
    });
});

//works