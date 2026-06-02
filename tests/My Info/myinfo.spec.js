import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages/loginPage';
import { DashboardPage } from '../../Pages/dashboardPage';
import { MyInfoPage } from '../../Pages/myInfoPage';

test.describe('My Info Module Tests', () => {
    // let page;
    // let context;

    // test.beforeAll(async ({ browser }) => {
    //     context = await browser.newContext();
    //     page = await context.newPage();
    //     loginPage = new LoginPage(page);
    //     dashboardPage = new DashboardPage(page);
    //     myInfoPage = new MyInfoPage(page);
    //     await loginPage.gotoLoginPage();
    //     await loginPage.login('Admin', 'admin123');
    //     await dashboardPage.myInfoMenu.click();
    //     await page.waitForURL(/viewPersonalDetails/, {timeout: 15000});
    //     await expect(myInfoPage.myInfoHeading).toBeVisible();
    // });

    // test.afterAll(async () => {
    //     await context.close();
    // });

    let loginPage;
    let dashboardPage;
    let myInfoPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        myInfoPage = new MyInfoPage(page);
        await loginPage.gotoLoginPage();
        await loginPage.login('Admin', 'admin123');
        await dashboardPage.myInfoMenu.click();
        await page.waitForURL(/viewPersonalDetails/);
    });

    test('1.Verify Last Name accepts input', async () => {
        await myInfoPage.lastNameInput.click();
        await myInfoPage.lastNameInput.press('Control+A');
        await myInfoPage.lastNameInput.press('Backspace');
        await myInfoPage.lastNameInput.fill('User');
        await expect(myInfoPage.lastNameInput).toHaveValue('User');
    });

    test('2.Verify Employee ID accepts input', async () => {
        await myInfoPage.employeeIdInput.fill('1001');
        await expect(myInfoPage.employeeIdInput).toHaveValue('1001');
    });

    test('3.Verify Other ID accepts input', async () => {
        await myInfoPage.otherIdInput.fill('OID100');
        await expect(myInfoPage.otherIdInput).toHaveValue('OID100');
    });

    test('4.Verify Driver License accepts input', async () => {
        await myInfoPage.driverLicenseInput.clear();
        await myInfoPage.driverLicenseInput.fill('DL123456');
        await expect(myInfoPage.driverLicenseInput).toHaveValue('DL123456');
    });

    test('5.Verify Nationality dropdown selectable', async () => {
        await myInfoPage.selectDropdown.first().click();
        await myInfoPage.dropdownOptions.nth(1).click();
        await expect(myInfoPage.selectDropdown.first()).toBeVisible();
    });

    test('6.Verify Marital Status dropdown selectable', async () => {
        await myInfoPage.selectDropdown.nth(1).click();
        await myInfoPage.dropdownOptions.nth(1).click();
        await expect(myInfoPage.selectDropdown.nth(1)).toBeVisible();
    });

    test('7.Verify Emergency Contacts page opens', async ({ page }) => {
        await myInfoPage.emergencyContactsTab.click();
        await page.waitForURL(/viewEmergencyContacts/);
        await expect(page).toHaveURL(/viewEmergencyContacts/);
    });

    test('8.Verify Emergency Contact validation', async () => {
        await myInfoPage.addButton.click();
        await myInfoPage.emergencyContactSaveButton.click();
        await expect(myInfoPage.requiredMessage).toBeVisible();
        await myInfoPage.cancelButton.click();
    });

    test('9.Verify page refresh keeps session', async ({ page }) => {
        await page.reload();
        await expect(myInfoPage.myInfoHeading).toBeVisible();
    });

    test('10.Verify Dependents page opens', async ({ page }) => {
        await myInfoPage.dependentsTab.click();
        await expect(page).toHaveURL(/viewDependents/);
    });

    test('11.Verify Dependent validation', async () => {
        await myInfoPage.addButton.click();
        await myInfoPage.saveButton.click();
        await expect(myInfoPage.requiredMessage).toBeVisible();
        await myInfoPage.cancelButton.click();
    });
});

//WORKSSS