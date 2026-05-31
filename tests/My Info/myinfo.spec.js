import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages/loginPage';
import { DashboardPage } from '../../Pages/dashboardPage';
import { MyInfoPage } from '../../Pages/myInfoPage';

test.describe('My Info Module Tests', () => {
    let page;
    let context;
    let loginPage;
    let dashboardPage;
    let myInfoPage;

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        myInfoPage = new MyInfoPage(page);
        await loginPage.gotoLoginPage();
        await loginPage.login('Admin', 'admin123');
        await dashboardPage.myInfoMenu.click();
        await expect(myInfoPage.myInfoHeading).toBeVisible();
    });

    test.afterAll(async () => {
        await context.close();
    });

    test('1.Verify Personal Details page opens', async () => {
        await expect(page).toHaveURL(/viewPersonalDetails/);
    });

    test('2.Verify First Name accepts input', async () => {
        await myInfoPage.firstNameInput.fill('Admin');
        await expect(myInfoPage.firstNameInput).toHaveValue('Admin');
    });

    test('3.Verify Middle Name accepts input', async () => {
        await myInfoPage.middleNameInput.fill('Test');
        await expect(myInfoPage.middleNameInput).toHaveValue('Test');
    });

    test('4.Verify Last Name accepts input', async () => {
        await myInfoPage.lastNameInput.click();
        await myInfoPage.lastNameInput.press('Control+A');
        await myInfoPage.lastNameInput.press('Backspace');
        await myInfoPage.lastNameInput.fill('User');
        await expect(myInfoPage.lastNameInput).toHaveValue('User');
    });

    test('5.Verify Employee ID accepts input', async () => {
        await myInfoPage.employeeIdInput.fill('1001');
        await expect(myInfoPage.employeeIdInput).toHaveValue('1001');
    });

    test('6.Verify Other ID accepts input', async () => {
        await myInfoPage.otherIdInput.fill('OID100');
        await expect(myInfoPage.otherIdInput).toHaveValue('OID100');
    });

    test('7.Verify Driver License accepts input', async () => {
        await myInfoPage.driverLicenseInput.clear();
        await myInfoPage.driverLicenseInput.fill('DL123456');
        await expect(myInfoPage.driverLicenseInput).toHaveValue('DL123456');
    });

    test('8.Verify Nationality dropdown selectable', async () => {
        await myInfoPage.selectDropdown.first().click();
        await myInfoPage.dropdownOptions.nth(1).click();
        await expect(myInfoPage.selectDropdown.first()).toBeVisible();
    });

    test('9.Verify Marital Status dropdown selectable', async () => {
        await myInfoPage.selectDropdown.nth(1).click();
        await myInfoPage.dropdownOptions.nth(1).click();
        await expect(myInfoPage.selectDropdown.nth(1)).toBeVisible();
    });

    test('10.Verify Contact Details page navigation', async () => {
        await myInfoPage.contactDetailsTab.click();
        await expect(page).toHaveURL(/contactDetails/);
    });

    test('11.Verify Street Address accepts input', async () => {
        await myInfoPage.street1Input.fill('Chennai');
        await expect(myInfoPage.street1Input).toHaveValue('Chennai');
    });

    test('12.Verify City accepts input', async () => {
        await myInfoPage.cityInput.fill('Chennai');
        await expect(myInfoPage.cityInput).toHaveValue('Chennai');
    });

    test('13.Verify Emergency Contacts page opens', async () => {
        await myInfoPage.emergencyContactsTab.waitFor();
        await myInfoPage.emergencyContactsTab.click();
        await page.waitForURL(/viewEmergencyContacts/,{ timeout: 10000 });
        await expect(page).toHaveURL(/viewEmergencyContacts/);
    });

    test('14.Verify Emergency Contact validation', async () => {
        await myInfoPage.addButton.click();
        await myInfoPage.emergencyContactSaveButton.click();
        await expect(myInfoPage.requiredMessage).toBeVisible();
        await myInfoPage.cancelButton.click();
    });

    test('15.Verify page refresh keeps session', async () => {
        await page.reload();
        await expect(myInfoPage.myInfoHeading).toBeVisible();
    });

    test('16.Verify Dependents page opens', async () => {
        await myInfoPage.dependentsTab.click();
        await expect(page).toHaveURL(/viewDependents/);
    });

    test('17.Verify Dependent validation', async () => {
        await myInfoPage.addButton.click();
        await myInfoPage.saveButton.click();
        await expect(myInfoPage.requiredMessage).toBeVisible();
        await myInfoPage.cancelButton.click();
    });
});

//WORKSSS